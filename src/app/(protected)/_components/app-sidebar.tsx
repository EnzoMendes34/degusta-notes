"use client";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { authClient } from "@/src/lib/auth-client";
import {
  BookPlusIcon,
  LogOutIcon,
  NotebookTabsIcon,
  User2Icon,
  WineIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DegustaLogo } from "./degusta-logo";
import { Button } from "@/src/components/ui/button";

const items = [
  {
    title: "Notas",
    icon: NotebookTabsIcon,
    url: "/notes",
  },
  {
    title: "Criar nota",
    icon: BookPlusIcon,
    url: "/note-form",
  },
];

export function AppSidebar() {
  const router = useRouter();
  const session = authClient.useSession();
  const pathName = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-zinc-300">
        <DegustaLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathName === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Avatar>
                <AvatarFallback>
                  <User2Icon />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">{session?.data?.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session?.data?.user.email}
                </p>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Button
                className="w-full cursor-pointer"
                variant="ghost"
                onClick={handleSignOut}
              >
                <LogOutIcon /> Sair
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
