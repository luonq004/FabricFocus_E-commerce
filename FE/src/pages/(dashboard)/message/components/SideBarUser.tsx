import { useChatStore } from "@/common/context/useChatStore";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { useUserContext } from "@/common/context/UserProvider";

const SideBarUser = () => {
  const [conversationSelect, setConversationSelect] = useState<string | null>(
    null
  );

  const { _id } = useUserContext();

  const {
    conversations,
    getConversations,
    isConversationsLoading,
    setSelectedUser,
    setSelectedConversation,
  } = useChatStore();

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  if (isConversationsLoading) return <SidebarSkeleton />;

  return (
    <div className="cursor-pointer w-[120px] lg:w-[340px] max-h-[78vh] min-h-[78vh] overflow-y-auto border-r pt-4">
      {/* asdsd */}
      {conversations
        .filter((user) => user.user._id !== _id)
        .map((user) => {
          return (
            <div
              className={`flex gap-2 items-center w-full hover:bg-slate-100 px-4 py-2 mb-4 ${
                conversationSelect === user.user._id ? "bg-gray-200" : ""
              }`}
              key={user._id}
              onClick={() => {
                setConversationSelect(user.user._id);
                setSelectedUser(user.user._id);
                setSelectedConversation(user._id);
              }}
            >
              <img
                className="size-12 rounded-full"
                src={user.user.imageUrl}
                alt="Ảnh user"
              />
              <div className="flex flex-col w-full">
                <span className="line-clamp-1 hidden lg:block">
                  {user.user.firstName} {user.user.lastName}
                </span>
                {/* <span className="hidden lg:block text-gray-400">1 ngày trước</span> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SideBarUser;
