"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: "blue" | "green" | "orange" | "purple";
}

const colorClasses = {
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  orange: "bg-orange-600 hover:bg-orange-700",
  purple: "bg-purple-600 hover:bg-purple-700"
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Actions rapides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`${colorClasses[action.color]} text-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{action.title}</h3>
                  <p className="text-sm text-white/80">{action.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
