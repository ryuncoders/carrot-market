import TabBarTop from "@/components/tab-bar-top";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabBarTop />
      {children}
    </div>
  );
}
