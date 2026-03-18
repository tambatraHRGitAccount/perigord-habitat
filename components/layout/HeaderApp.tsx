import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeaderApp() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <Image src="/logo-default.png" alt="Qui fait quoi" width={32} height={32} className="rounded" />
        <span className="font-semibold text-lg tracking-tight text-gray-900">
          Qui fait quoi ?
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">Se connecter</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/dashboard">S'inscrire</Link>
        </Button>
      </div>
    </header>
  );
}
