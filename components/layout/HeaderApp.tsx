"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, MessageSquare, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const NAV_ITEMS = [
  { href: "/schema-logement-konva", label: "Schéma logement" },
  { href: "/login", label: "Se connecter" },
  { href: "/register", label: "S'inscrire" },
];

export function HeaderApp({ onLogoClick }: { onLogoClick?: () => void }) {
  const pathname = usePathname();
  const isSchemaPage = pathname === "/schema-logement-konva";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0" onClick={onLogoClick}>
        <Image src="/logo-default.png" alt="Qui fait quoi" width={32} height={32} className="rounded" />
        <span className="font-semibold text-base sm:text-lg tracking-tight text-gray-900">
          Qui fait quoi ?
        </span>
      </Link>

      {/* Desktop */}
      <div className="hidden sm:flex items-center gap-1">
        <Button variant="ghost" size="icon" className="bg-primary/10 text-primary hover:bg-primary/20" asChild title={isSchemaPage ? "Chat" : "Schéma logement"}>
          <Link href={isSchemaPage ? "/" : "/schema-logement-konva"}>
            {isSchemaPage ? <MessageSquare size={18} /> : <Box size={18} />}
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">S'inscrire</Link>
        </Button>
      </div>

      {/* Mobile — Sheet plein écran */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="h-screen w-screen flex flex-col px-6 py-6">
            <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>

            {/* Header du sheet */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={onLogoClick}>
                <Image src="/logo-default.png" alt="Qui fait quoi" width={32} height={32} className="rounded" />
                <span className="font-semibold text-lg text-gray-900">Qui fait quoi ?</span>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={20} />
                </Button>
              </SheetClose>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-indigo-600 py-3 border-b border-gray-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

    </header>
  );
}
