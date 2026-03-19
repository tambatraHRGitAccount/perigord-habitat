import { notFound } from "next/navigation";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { MaterielHero } from "@/components/client/MaterielHero";
import { MATERIELS } from "@/data/materiels";

export function generateStaticParams() {
  return MATERIELS.map((m) => ({ id: String(m.id) }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MaterielDetailPage({ params }: Props) {
  const { id } = await params;
  const materiel = MATERIELS.find((m) => m.id === Number(id));

  if (!materiel) notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />
      <MaterielHero materiel={materiel} />
    </div>
  );
}
