"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, MessageSquare, FileText, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export function FooterApp() {
  const navigation = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/client/chat", label: "Assistant IA", icon: MessageSquare },
    { href: "/client/tutos", label: "Tutos & conseils", icon: FileText },
    { href: "/client/contacts", label: "Contacts", icon: Phone },
  ];

  return (
    <footer className="w-full bg-slate-900 text-white border-t-4 border-indigo-600 relative overflow-hidden">
      {/* Motif décoratif en arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg">
                  <Image src="/logo-default.png" alt="Qui fait quoi" width={28} height={28} className="rounded" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-slate-900"></div>
              </div>
              <span className="font-bold text-2xl">Qui fait quoi ?</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 text-base max-w-md">
              Votre assistant pour comprendre, diagnostiquer et résoudre les problèmes de votre logement en toute simplicité.
            </p>
            
            {/* Infos avec design en cartes */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <MapPin size={16} className="text-white" />
                </div>
                <span className="text-slate-300 text-sm">France</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                  <Clock size={16} className="text-white" />
                </div>
                <span className="text-slate-300 text-sm">Disponible 24/7</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
              <h3 className="font-bold text-lg text-white">Navigation</h3>
            </div>
            <ul className="space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-3 group p-2 rounded-lg hover:bg-slate-800"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                        <Icon size={16} className="text-indigo-400 group-hover:text-white transition-colors" />
                      </div>
                      <span className="flex-1">{item.label}</span>
                      <ArrowRight size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
              <h3 className="font-bold text-lg text-white">Contact</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@quifaitquoi.fr" 
                  className="text-slate-400 hover:text-white transition-colors flex items-start gap-3 group p-2 rounded-lg hover:bg-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center transition-colors shrink-0">
                    <Mail size={16} className="text-indigo-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm break-all">contact@quifaitquoi.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33123456789" 
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-3 group p-2 rounded-lg hover:bg-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                    <Phone size={16} className="text-indigo-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm">01 23 45 67 89</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Séparateur avec design */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-slate-900">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <div className="w-2 h-2 rounded-full bg-purple-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 Qui fait quoi. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/mentions-legales" 
              className="text-sm text-slate-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Mentions légales
            </Link>
            <Link 
              href="/confidentialite" 
              className="text-sm text-slate-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Confidentialité
            </Link>
            <Link 
              href="/cgu" 
              className="text-sm text-slate-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
