import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { LoginForm } from "./_components/login-form";
import { SignUpForm } from "./_components/sign-up-form";

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <Tabs
          defaultValue="login"
          className="border-2 p-10 border-rose-950 rounded-sm w-100"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
