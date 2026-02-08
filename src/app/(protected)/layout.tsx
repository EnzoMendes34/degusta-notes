import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { PageContainer } from "@/src/components/ui/page-container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <PageContainer>{children}</PageContainer>
      </main>
    </SidebarProvider>
  );
}
