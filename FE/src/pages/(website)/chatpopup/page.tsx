import { useEffect, useState } from "react";
import { CiChat2 } from "react-icons/ci";
import Comment from "./components/Comment";
import Content from "./components/Content";

import { useUserContext } from "@/common/context/UserProvider";
import axios from "@/configs/axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

interface Message {
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
  };
}

interface ConversationResponse {
  _id: string;
  __v: number;
  updatedAt: Date;
  messages: Message[];
  admins: [
    {
      _id: string;
    }
  ];
}

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { _id } = useUserContext();

  // const { conversation, isLoading, error } = useGetConversation(_id!);

  const fetchMessages = async () => {
    try {
      const data = await axios.get<ConversationResponse>(
        `/conversation/${_id}`
      );
      socket.emit("joinChat", data.data._id);
      setConversationId(data.data._id);
      setMessages(data.data.messages);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!_id) return;
    socket.emit("setup", _id);
    fetchMessages();
    // socket.emit("joinChat", conversation?._id);
  }, [_id]);

  useEffect(() => {
    socket.on("messageRecieved", (message: Message) => {
      console.log("message", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <>
      <div
        className="fixed bottom-[4%] rounded-full right-5 z-10 bg-white p-2 border-4 shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiChat2 className="text-3xl text-[#b8cd06]" />
      </div>

      <div
        className={`w-[340px] max-w-[340px] fixed bottom-[12%] right-5 border h-[410px] bg-white rounded-md text-black ${
          isOpen ? "opacity-100 z-40 block" : "opacity-0 z-0 hidden"
        }`}
      >
        <div className="h-[325px] py-5">
          <Content messages={messages} />
        </div>

        <Comment conversationId={conversationId} setMessages={setMessages} />
      </div>
    </>
  );
};

export default ChatPopup;
