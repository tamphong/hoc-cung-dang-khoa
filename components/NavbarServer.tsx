import { getSession } from "@/lib/auth";
import Navbar from "./Navbar";

export default async function NavbarServer() {
  const session = await getSession();
  const user = session ? { name: session.name, role: session.role } : null;
  return <Navbar user={user} />;
}
