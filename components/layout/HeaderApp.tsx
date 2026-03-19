"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, MessageSquare, Menu, X, User, Settings, LogOut, LayoutDashboard, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS_GUEST = [
  { href: "/login", label: "Se connecter" },
  { href: "/register", label: "S'inscrire" },
];

const NAV_ITEMS_AUTH = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/parametres", label: "Paramètres" },
];

function getInitials(name?: string | null, email?: string | null) {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "?";
}

export function HeaderApp({ onLogoClick }: { onLogoClick?: () => void }) {
  const pathname = usePathname();
  const isSchemaPage = pathname === "/schema-logement-konva";
  const { user, loading, logout } = useAuth();

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? null;
  const initials = getInitials(user?.user_metadata?.full_name, user?.email);

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
            {isSchemaPage ? <MessageSquare size={18} /> : <Box size={18} /> }
          </Link>
        </Button>

        {!loading && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ml-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                  {user.user_metadata?.full_name && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/client/materiels" className="flex items-center gap-2 cursor-pointer">
                    <List size={15} /> Listes des matériels
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/parametres" className="flex items-center gap-2 cursor-pointer">
                    <Settings size={15} /> Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut size={15} /> Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">S'inscrire</Link>
              </Button>
            </>
          )
        )}
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

            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={onLogoClick}>
                <Image src="/logo-default.png" alt="Qui fait quoi" width={32} height={32} className="rounded" />
                <span className="font-semibold text-lg text-gray-900">Qui fait quoi ?</span>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon"><X size={20} /></Button>
              </SheetClose>
            </div>

            {user && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                  {user.user_metadata?.full_name && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-2 flex-1">
              {(user ? NAV_ITEMS_AUTH : NAV_ITEMS_GUEST).map((item) => (
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

            {user && (
              <SheetClose asChild>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 font-medium py-3 mt-4"
                >
                  <LogOut size={18} /> Se déconnecter
                </button>
              </SheetClose>
            )}
          </SheetContent>
        </Sheet>
      </div>

    </header>
  );
}
