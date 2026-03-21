"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home, Bot, Building2, BookOpen, HelpCircle,
  Phone, UserCircle, Menu, X, LogOut, Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuth } from "@/hooks/useAuth";

const NAV_MAIN = [
  { href: "/",                     icon: Home,          title: "Accueil" },
  { href: "/client/chat",          icon: Bot,   title: "Diagnostiquer un problème" },
  { href: "/client/logement",      icon: Building2,     title: "Mon logement" },
  { href: "/client/tutos",         icon: BookOpen,      title: "Tutos & conseils" },
  { href: "/client/qui-fait-quoi", icon: HelpCircle,    title: "Qui fait quoi ?" },
  { href: "/client/contacts",      icon: Phone,         title: "Contacts utiles" },
];

const MOBILE_NAV = [
  ...NAV_MAIN,
  { href: "/client/notifications", icon: Bell,       title: "Notifications" },
  { href: "/client/compte",        icon: UserCircle, title: "Mon compte" },
];

function getInitials(name?: string | null, email?: string | null) {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "?";
}

export function HeaderApp({ onLogoClick }: { onLogoClick?: () => void }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? null;
  const initials = getInitials(user?.user_metadata?.full_name, user?.email);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 shadow-sm">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0" onClick={onLogoClick}>
        <Image src="/logo-default.png" alt="Logo" width={32} height={32} className="rounded" />
        <span className="font-semibold text-base sm:text-lg tracking-tight text-gray-900 hidden sm:block">
          Qui fait quoi ?
        </span>
      </Link>

      {/* ── Desktop ── */}
      <div className="hidden lg:flex items-center gap-0.5">
        {!loading && (
          user ? (
            <>
              {NAV_MAIN.map(({ href, icon: Icon, title }) => (
                <Link
                  key={href}
                  href={href}
                  title={title}
                  className={`relative group p-2.5 rounded-lg transition-colors ${
                    pathname === href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-500 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <Icon size={18} />
                  <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                    {title}
                  </span>
                </Link>
              ))}

              {/* Notifications */}
              <Link
                href="/client/notifications"
                title="Alertes"
                className={`relative group p-2.5 rounded-lg transition-colors ${
                  pathname === "/client/notifications"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-500 hover:text-primary hover:bg-primary/10"
                }`}
              >
                <span className="relative block">
                  <Bell size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
                </span>
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                  Alertes
                </span>
              </Link>

              {/* Mon compte dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative ml-1 p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                      Mon compte
                    </span>
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
                    <Link href="/client/compte" className="flex items-center gap-2 cursor-pointer">
                      <UserCircle size={15} /> Mon profil
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
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/client/auth/login">Se connecter</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/client/auth/register">S'inscrire</Link>
              </Button>
            </>
          )
        )}
      </div>

      {/* ── Mobile / Tablet ── */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon"><Menu size={20} /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="h-screen w-screen flex flex-col px-6 py-6">
            <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>

            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2" onClick={onLogoClick}>
                <Image src="/logo-default.png" alt="Logo" width={32} height={32} className="rounded" />
                <span className="font-semibold text-lg text-gray-900">Qui fait quoi ?</span>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon"><X size={20} /></Button>
              </SheetClose>
            </div>

            {user && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                  {user.user_metadata?.full_name && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
              {(user ? MOBILE_NAV : [
                { href: "/client/auth/login",    title: "Se connecter" },
                { href: "/client/auth/register", title: "S'inscrire" },
              ]).map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-base font-medium py-3 border-b border-gray-100 transition-colors ${
                      pathname === item.href ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            {user && (
              <SheetClose asChild>
                <button onClick={logout} className="flex items-center gap-2 text-red-600 font-medium py-3 mt-4">
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
