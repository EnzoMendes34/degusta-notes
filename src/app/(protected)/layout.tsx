import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { PageContainer } from "@/src/components/ui/page-container";
import { DegustaLogo } from "./_components/degusta-logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <PageContainer>
          <div className="mb-8">
            <DegustaLogo />
          </div>
          {children}
        </PageContainer>
      </main>
    </SidebarProvider>
  );
}
