"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "blue" | "green" | "orange" | "purple";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-600",
    text: "text-blue-600"
  },
  green: {
    bg: "bg-green-50",
    icon: "bg-green-600",
    text: "text-green-600"
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-600",
    text: "text-orange-600"
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-600",
    text: "text-purple-600"
  }
};

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center shadow-md`}>
          <Icon className="text-white" size={26} />
        </div>
        {trend && (
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-black ${colors.text}`}>{value}</p>
    </div>
  );
}
