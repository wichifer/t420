import MobileSidebar from "./MobileSidebar";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

import UserMenu from "@/components/common/UserMenu";

import { Button } from "@/components/ui/button";


export function Header() {

  return (

    <header
      className="
        h-14
        border-b
        border-border
        bg-background
        flex
        items-center
        justify-between
        px-4
      "
    >


      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <MobileSidebar />


        <span
          className="
            font-semibold
            text-sm
          "
        >

          SaaS T420

        </span>


      </div>



      <div
        className="
          hidden
          md:block
          text-sm
          text-muted-foreground
        "
      >

        Dashboard

      </div>



      <div
        className="
          flex
          items-center
          gap-2
        "
      >

        <Button
          variant="ghost"
          size="icon"
        >
          🔔
        </Button>


        <ThemeToggle />


        <UserMenu />


      </div>


    </header>

  );

}