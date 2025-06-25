import { useChatStore } from "@/common/context/useChatStore";
import { useUserContext } from "@/common/context/UserProvider";

import { Button } from "@/components/ui/button";
import axios from "@/configs/axios";

import { useEffect, useRef, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

import { socket } from "@/lib/utils";

type Message = {
  _id: string;
  text: string;
  senderType: string;
  createdAt: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    imageUrl: string;
    listUsers: string[];
  };
};

type ConversationResponse = {
  messages: Message[];
};

const ContentChat = () => {
  const { _id } = useUserContext();
  const [listMessage, setListMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedUser,
    newMessage,
    setNewMessage,
    selectedConversation,
    clearNewMessage,
  } = useChatStore();

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get<ConversationResponse>(
        `/conversation/${selectedUser}`
      );

      setListMessage(data.data.messages);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      // Kiểm tra nếu user hiện tại nằm trong danh sách user liên quan
      if (message.sender.listUsers?.includes(_id!)) {
        // Chỉ xử lý khi tin nhắn đến từ `selectedUser`
        if (message.sender._id === selectedUser) {
          setListMessage((prev: Message[]) => [...prev, message]);
        }
      }
    };

    socket.on("messageRecieved", handleMessage);

    // Cleanup khi component bị unmount
    return () => {
      socket.off("messageRecieved", handleMessage);
    };
  }, [_id, selectedUser]);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Kiểm tra nếu tin nhắn rỗng thì không gửi
    try {
      const data = await axios.post(
        `/conversation/${selectedConversation}/messageAdmin`,
        {
          text: newMessage,
          adminId: _id,
          receiverId: selectedUser,
        }
      );

      socket.emit("newMessage", data.data);
      setListMessage((prev: Message[]) => [...prev, data.data]);
      clearNewMessage();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && newMessage) {
      // await sendMessage(_id);
    }
  };

  useEffect(() => {
    if (messageEndRef.current && listMessage) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="spinner mx-auto mt-20"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className=" border-b pb-4">
        <div className="w-full max-h-[70vh] min-h-[70vh]">
          <ScrollableFeed>
            {listMessage?.length > 0 ? (
              listMessage.map((message) => (
                <div key={message._id}>
                  {message.senderType === "Admin" ? (
                    <div
                      className="flex gap-2 rounded-lg text-sm mr-auto mt-4 justify-end"
                      ref={messageEndRef}
                    >
                      <p className="bg-[#b8cd06] text-primary-foreground mr-2 max-w-[75%] px-3 py-2 break-words rounded-lg">
                        {message.text}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="flex gap-2 rounded-lg text-sm ml-2 mt-4"
                      ref={messageEndRef}
                    >
                      <img
                        className="w-8 h-8 rounded-full justify-end"
                        src={message.sender.imageUrl}
                        alt={`${message.sender.firstName} ${message.sender.lastName}`}
                      />
                      <p className="bg-gray-200 max-w-[75%] px-3 py-2 break-words rounded-lg">
                        {message.text}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Cuộc hội thoại trống</p>
            )}
          </ScrollableFeed>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border-gray-200"
          disabled={selectedUser ? false : true}
        />
        <Button
          disabled={selectedUser ? false : true}
          onClick={handleSendMessage}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContentChat;
