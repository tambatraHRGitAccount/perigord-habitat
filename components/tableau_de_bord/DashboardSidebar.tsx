"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, LayoutDashboard } from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    href: "/dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard
  },
  {
    href: "/equipment",
    label: "Équipements",
    icon: Package
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col bg-white border-r border-gray-200 w-64">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
              <Image src="/logo-default.png" alt="Logo" width={24} height={24} className="rounded" />
            </div>
            <span className="font-bold text-lg text-gray-900">Qui fait quoi ?</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Retour à l'accueil */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
          >
            <Home size={20} className="shrink-0" />
            <span className="font-medium">Retour à l&apos;accueil</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Menu - TODO: Ajouter un drawer mobile */}
    </>
  );
}
