import Link from "next/link";
import * as React from "react";

export function AppFooter() {
  return (
    <footer className="py-6 md:py-0 border-t border-border/40">
      <div className="z-20 w-full bg-background/95 shadow-top backdrop-blur supports-[backdrop-filter]:bg-background">
        <div className="mx-4 md:mx-8 flex h-14 items-center text-center justify-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Dibuat oleh{" "}
          <Link
            href="/about"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Tim Bayu 
          </Link>
          {" "}untuk Tugas Perancangan Terintegrasi II. Source code dapat diakses pada{" "}
          <Link
            href="https://github.com/nafimulyoo/bayu-web"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        </div>
      </div>
      </footer>
  )
}


