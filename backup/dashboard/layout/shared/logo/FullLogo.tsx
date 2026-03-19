"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";

const FullLogo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 group">
      <div className="p-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg group-hover:bg-indigo-700 dark:group-hover:bg-indigo-600 transition-colors">
        <Wrench className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          Qui fait quoi
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
          Dashboard
        </span>
      </div>
    </Link>
  );
};

export default FullLogo;
