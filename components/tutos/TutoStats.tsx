import { BookOpenCheck, Leaf, Shield, BookOpen } from "lucide-react";

interface TutoStatsProps {
  total: number;
  tutoriels: number;
  ecogestes: number;
  prevention: number;
}

export function TutoStats({ total, tutoriels, ecogestes, prevention }: TutoStatsProps) {
  const stats = [
    { label: "Total", value: total, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Tutoriels", value: tutoriels, icon: BookOpenCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Écogestes", value: ecogestes, icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
    { label: "Prévention", value: prevention, icon: Shield, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
