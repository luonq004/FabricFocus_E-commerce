import { useUserContext } from "@/common/context/UserProvider";
import { Message } from "@/common/types/User";
import { Button } from "@/components/ui/button";
import axios from "@/configs/axios";
import { socket } from "@/lib/utils";
import { useEffect, useState } from "react";

const Comment = ({
  conversationId,
  setMessages,
}: {
  conversationId: string | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const { _id } = useUserContext();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!_id) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [_id]);

  const sendUserMessageSocket = async () => {
    try {
      const data = await axios.post(`/conversation/${_id}/message`, {
        text: newMessage,
        conversationId,
      });

      socket.emit("newMessage", data.data);
      setNewMessage("");
      setMessages((prev) => [...prev, data.data]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="absolute bottom-2 flex justify-between w-full gap-2 px-2">
      <input
        placeholder="Nhập tin nhắn"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 w-full border-[#b8cd06] rounded-lg ring-0 outline-0 focus:ring-0 focus:border-[#b8cd06] p-2"
        type="text"
      />
      {/* <Button onClick={handleSendMessage}>Gửi</Button> */}
      <Button onClick={sendUserMessageSocket}>Gửi</Button>
    </div>
  );
};

export default Comment;
