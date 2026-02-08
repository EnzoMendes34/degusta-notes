import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/notes");
  return <div>Wait a second</div>;
}
