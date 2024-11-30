import { GeistSans } from "geist/font/sans";

import "./globals.css";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Fan } from "lucide-react";
import { ThemeProvider } from "@/providers/theme-provider";
import AuthMiddleware from "@/app/(auth)/components/auth-middleware";


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthMiddleware/>
                
        <header className="z-[50] sticky top-0 w-full bg-background border-b backdrop-blur-sm border-border/40">
        <div className="container h-14 flex items-center">
            <Fan className="w-8 h-6 mr-1" />
            <span className="font-bold">Alat Latih PLTB</span>
            <span className="sr-only">Alat Latih PLTB</span>
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

      </ThemeProvider>
      </body>
    </html>
  );
}
