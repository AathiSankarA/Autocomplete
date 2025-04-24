import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "./ui/navigation-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";


export default function Navbar() {
  return (
    <>
      <div className="w-full max-h-min m-1 p-2 flex align-middle bg-blue-200 rounded-2xl">
        <div className="w-1/3 justify-items-start">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger><Menu /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/"> Home </NavigationMenuLink>
                  <br />
                  <NavigationMenuLink href="/models">Models</NavigationMenuLink>
                  <br />
                  <NavigationMenuLink href="/try"> Try </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="w-1/3 text-center">
          <div>
            <Link href={"https://github.com/AathiSankarA/Autocomplete"}>
              <h1 className="text-4xl">
                Autocomplete
              </h1>
            </Link>
          </div>
        </div>
        <div className="w-1/3 justify-items-end">
          <div className="w-fit">
            <Link href="https://pytorch.org/docs/stable/index.html">
              <Avatar>
                <AvatarImage src="/pytorch.png" />
                <AvatarFallback> Pytorch </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
