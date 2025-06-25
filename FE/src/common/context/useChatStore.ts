import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { create } from "zustand";
import { ChatStoreActions, IChatStoreState, IListMessage } from "../types/Chat";

import { socket } from "@/lib/utils";

const apiUrl = import.meta.env.VITE_API_URL;

const initialListMessage: IListMessage = {
  _id: "",
  user: "",
  admin: "",
  messages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useChatStore = create<IChatStoreState & ChatStoreActions>(
  (set, get) => ({
    listMessage: initialListMessage,
    newMessage: "",
    conversations: [],
    selectedUser: null,
    selectedConversation: null,
    isConversationsLoading: false,
    isMessagesLoading: false,

    getConversations: async () => {
      set({ isConversationsLoading: true });
      try {
        const res = await axios.get(`${apiUrl}/conversation`);
        set({ conversations: res.data });
        // socket.emit()
      } catch (error) {
        toast({
          variant: "destructive",
          title:
            axios.isAxiosError(error) && error.response?.data?.message
              ? error.response.data.message
              : "An error occurred",
        });
      } finally {
        set({ isConversationsLoading: false });
      }
    },

    getMessages: async (conversationId: string) => {
      set({ isMessagesLoading: true });
      try {
        const res = await axios.get(`${apiUrl}/conversation/${conversationId}`);

        set({ listMessage: res.data });
        socket.emit("joinChat", res.data._id);
      } catch (error) {
        console.log(error);
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (adminId) => {
      const { selectedConversation, listMessage, selectedUser, newMessage } =
        get();
      try {
        set({ newMessage: "" });
        const res = await axios.post(
          `${apiUrl}/conversation/${selectedConversation}/messageAdmin`,
          {
            text: newMessage,
            adminId,
            receiverId: selectedUser,
          }
        );

        socket.emit("newMessage", res.data);
        set({
          listMessage: {
            ...listMessage, // Giữ nguyên các thuộc tính khác của listMessage
            messages: [...listMessage.messages, res.data], // Cập nhật messages
          },
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title:
            axios.isAxiosError(error) && error.response?.data?.message
              ? error.response.data.message
              : "An error occurred",
        });
      }
    },

    subscribeToMessages: () => {
      const { selectedConversation } = get();

      socket.on("messageRecieved", (newMessageRecieved) => {
        if (!selectedConversation || !selectedConversation) return;

        set({
          listMessage: {
            ...get().listMessage, // Giữ nguyên các thuộc tính khác của listMessage
            messages: [...get().listMessage.messages, newMessageRecieved], // Cập nhật messages
          },
        });
      });
    },

    unsubscribeFromMessages: () => {
      // const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),

    setNewMessage: (e) => set({ newMessage: e.target.value }),

    clearNewMessage: () => set({ newMessage: "" }),
  })
);
