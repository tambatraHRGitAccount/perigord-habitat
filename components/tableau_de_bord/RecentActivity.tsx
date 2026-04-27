"use client";

import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "error" | "pending";
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50"
  },
  warning: {
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50"
  },
  pending: {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-50"
  }
};

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Activité récente</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = statusConfig[activity.status];
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                <Icon className={config.color} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
