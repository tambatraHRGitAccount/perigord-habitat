"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home, MessageSquare, Box, Bell, Menu, X, LogOut,
  FileText, Wrench, AlertTriangle, UserCircle, History,
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

/* ── icônes nav principale (session connectée) ── */
const NAV_AUTH = [
  { href: "/",                  icon: Home,           title: "Accueil" },
  { href: "/client/chat",       icon: MessageSquare,  title: "Assistant IA" },
  { href: "/client/materiels",  icon: Box,            title: "Matériels" },
];

/* ── items dropdown profil ── */
const DROPDOWN_ITEMS = [
  { href: "/client/notices",       icon: FileText,      label: "Notices" },
  { href: "/client/interventions", icon: Wrench,        label: "Interventions" },
  { href: "/client/incidents",     icon: AlertTriangle, label: "Incidents" },
  { href: "/client/profile",       icon: UserCircle,    label: "Profil" },
  { href: "/client/historique",    icon: History,       label: "Historique" },
];

/* ── items mobile (session connectée) ── */
const MOBILE_AUTH = [
  { href: "/",                  label: "Accueil" },
  { href: "/client/chat",       label: "Assistant IA" },
  { href: "/client/materiels",  label: "Matériels" },
  { href: "/client/notices",    label: "Notices" },
  { href: "/client/interventions", label: "Interventions" },
  { href: "/client/incidents",  label: "Incidents" },
  { href: "/client/profile",    label: "Profil" },
  { href: "/client/historique", label: "Historique" },
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
        <Image src="/logo-default.png" alt="Qui fait quoi" width={32} height={32} className="rounded" />
        <span className="font-semibold text-base sm:text-lg tracking-tight text-gray-900">
          Qui fait quoi ?
        </span>
      </Link>

      {/* ── Desktop ── */}
      <div className="hidden sm:flex items-center gap-1">
        {!loading && (
          user ? (
            <>
              {/* Nav icons */}
              {NAV_AUTH.map(({ href, icon: Icon, title }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium ${
                    pathname === href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-500 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <Icon size={18} />
                  <span>{title}</span>
                </Link>
              ))}

              {/* Notification */}
              <Link
                href="/client/notifications"
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors relative ${
                  pathname === "/client/notifications"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-500 hover:text-primary hover:bg-primary/10"
                }`}
              >
                <span className="relative">
                  <Bell size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
                </span>
                <span className="text-xs font-medium">Alertes</span>
              </Link>

              {/* Profil dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <Avatar className="h-10 w-10">
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
                  {DROPDOWN_ITEMS.map(({ href, icon: Icon, label }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} className="flex items-center gap-2 cursor-pointer">
                        <Icon size={15} /> {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
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

      {/* ── Mobile ── */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon"><Menu size={20} /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="h-screen w-screen flex flex-col px-6 py-6">
            <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>

            <div className="flex items-center justify-between mb-6">
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
              {(user ? MOBILE_AUTH : [
                { href: "/client/auth/login",     label: "Se connecter" },
                { href: "/client/auth/register",  label: "S'inscrire" },
              ]).map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-base font-medium py-3 border-b border-gray-100 transition-colors ${
                      pathname === item.href ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {item.label}
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
