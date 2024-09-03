import { InitialChats } from "@/app/(tabs)/chats/page";
import ListChat from "./listChat";

interface ChatRoomListProps {
  initialChats: InitialChats;
}

export default function InitialChat({ initialChats }: ChatRoomListProps) {
  return (
    <div className="p-2">
      {initialChats.map((chatroom, index) => (
        <ListChat
          key={index}
          chatRoomId={chatroom.id}
          product={chatroom.product}
          user={chatroom.users[0]!}
        />
      ))}
    </div>
  );
}
