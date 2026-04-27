"use client";

import { Bell, Menu, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

function getInitials(name?: string | null, email?: string | null) {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "?";
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const [notificationCount] = useState(3);

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Utilisateur";
  const initials = getInitials(user?.user_metadata?.full_name, user?.email);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Titre de la page */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button - TODO */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={24} />
            </button>
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{title}</h1>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Link
              href="/client/notifications"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>

            {/* Menu utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-bold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500">Mon compte</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                  {user?.email && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/client/compte" className="flex items-center gap-2 cursor-pointer">
                    <User size={16} /> Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/client/compte" className="flex items-center gap-2 cursor-pointer">
                    <Settings size={16} /> Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut size={16} /> Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
