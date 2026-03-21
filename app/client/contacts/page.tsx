"use client";

import { HeaderApp } from "@/components/layout/HeaderApp";
import { Building2, AlertTriangle, Wrench, Phone, Mail, Clock, MapPin } from "lucide-react";

type ContactItem = {
  label: string;
  value: string;
  icon: typeof Phone;
  link?: string;
  urgent?: boolean;
  note?: string;
};

type ContactSection = {
  title: string;
  icon: typeof Phone;
  color: string;
  items: ContactItem[];
};

const CONTACTS: Record<string, ContactSection> = {
  bailleur: {
    title: "Votre bailleur",
    icon: Building2,
    color: "bg-blue-50 text-blue-600",
    items: [
      { label: "Nom", value: "Périgord Habitat", icon: Building2 },
      { label: "Téléphone", value: "05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
      { label: "Email", value: "contact@perigord-habitat.fr", icon: Mail, link: "mailto:contact@perigord-habitat.fr" },
      { label: "Horaires", value: "Lun-Ven : 9h-12h / 14h-17h", icon: Clock },
      { label: "Adresse", value: "123 Avenue de la République, 24000 Périgueux", icon: MapPin },
    ],
  },
  urgences: {
    title: "Numéros d'urgence",
    icon: AlertTriangle,
    color: "bg-red-50 text-red-600",
    items: [
      { label: "Pompiers", value: "18", icon: Phone, link: "tel:18", urgent: true },
      { label: "SAMU", value: "15", icon: Phone, link: "tel:15", urgent: true },
      { label: "Police / Gendarmerie", value: "17", icon: Phone, link: "tel:17", urgent: true },
      { label: "Numéro d'urgence européen", value: "112", icon: Phone, link: "tel:112", urgent: true },
      { label: "Urgence gaz (GrDF)", value: "0 800 47 33 33", icon: Phone, link: "tel:0800473333" },
      { label: "Urgence électricité (Enedis)", value: "09 72 67 50 24", icon: Phone, link: "tel:0972675024" },
      { label: "Urgence eau", value: "05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
    ],
  },
  prestataires: {
    title: "Prestataires agréés",
    icon: Wrench,
    color: "bg-green-50 text-green-600",
    items: [
      { label: "Chaudière / Chauffage", value: "Chauffage Pro - 05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
      { label: "VMC / Ventilation", value: "Ventil'Air - 05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
      { label: "Plomberie", value: "Plomberie Express - 05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
      { label: "Électricité", value: "Élec Services - 05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
      { label: "Serrurerie", value: "Serrure Rapide - 05 53 XX XX XX", icon: Phone, link: "tel:0553XXXXXX" },
    ],
  },
  assistance: {
    title: "Assistance téléphonique",
    icon: Phone,
    color: "bg-purple-50 text-purple-600",
    items: [
      { 
        label: "Hotline technique 24/7", 
        value: "0 892 XX XX XX", 
        icon: Phone, 
        link: "tel:0892XXXXXX",
        note: "Service 0,35€/min + prix appel"
      },
      { 
        label: "Assistance dépannage", 
        value: "0 899 XX XX XX", 
        icon: Phone, 
        link: "tel:0899XXXXXX",
        note: "Service 1,35€/appel + 0,34€/min"
      },
    ],
  },
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* En-tête */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contacts utiles</h1>
            <p className="text-gray-500 text-sm mt-2">
              Tous les numéros importants pour votre logement
            </p>
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 gap-6 mt-4">
            {Object.entries(CONTACTS).map(([key, section]) => {
              const Icon = section.icon;
              return (
                <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                      <Icon size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      const content = (
                        <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                          item.link 
                            ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer" 
                            : "border-gray-100 bg-gray-50"
                        } ${item.urgent ? "border-red-200 bg-red-50" : ""}`}>
                          <ItemIcon size={16} className={`mt-0.5 shrink-0 ${item.urgent ? "text-red-600" : "text-gray-400"}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-500">{item.label}</p>
                            <p className={`text-sm font-semibold mt-0.5 ${item.urgent ? "text-red-700" : "text-gray-900"}`}>
                              {item.value}
                            </p>
                            {item.note && (
                              <p className="text-xs text-gray-500 mt-1 italic">{item.note}</p>
                            )}
                          </div>
                        </div>
                      );

                      return item.link ? (
                        <a key={idx} href={item.link}>
                          {content}
                        </a>
                      ) : (
                        <div key={idx}>{content}</div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Avertissement */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">⚠️ Important :</span> En cas d'urgence vitale (incendie, fuite de gaz importante, électrocution), 
              composez immédiatement le 18 (pompiers) ou le 15 (SAMU). N'attendez pas pour contacter votre bailleur.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
