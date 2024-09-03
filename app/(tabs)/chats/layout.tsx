import {
  AdjustmentsHorizontalIcon,
  BellIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-neutral-600">
        <span className="font-semibold text-lg">채팅</span>
        <div className="flex gap-4">
          <AdjustmentsHorizontalIcon className="size-7" />
          <QrCodeIcon className="size-7 " />
          <BellIcon className="size-7" />
        </div>
      </div>
      {children}
    </div>
  );
}
