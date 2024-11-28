import Link from "next/link";
import Image from "next/image";
import BayuIcon from "@/components/bayu-icon";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Fan } from "lucide-react";

export default function DemoLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
    <>
        <header className="z-[50] sticky top-0 w-full bg-background border-b backdrop-blur-sm border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <Fan className="w-8 h-6 mr-1" />
            <span className="font-bold">Alat Latih PLTB</span>
            <span className="sr-only">Alat Latih PLTB</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 bg-background"
              asChild
            >
              <Link href="https://github.com/nafimulyoo/bayu-web">
                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      {children}
      <div className="absolute bottom-0 w-full">
        <AppFooter />
      </div>
    </>
    );
  }

  