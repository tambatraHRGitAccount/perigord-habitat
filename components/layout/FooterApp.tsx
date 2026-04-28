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
    <footer className="w-full bg-gray-100 text-gray-900 relative overflow-hidden">
      {/* Motif décoratif en arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 opacity-30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 opacity-30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg">
                  <Image src="/logo-default.png" alt="Qui fait quoi" width={28} height={28} className="rounded" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-50"></div>
              </div>
              <span className="font-bold text-2xl text-gray-900">Qui fait quoi ?</span>
            </Link>
            <p className="text-gray-600 leading-relaxed mb-6 text-base max-w-md">
              Votre assistant pour comprendre, diagnostiquer et résoudre les problèmes de votre logement en toute simplicité.
            </p>
            
            {/* Infos avec design en cartes */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <MapPin size={16} className="text-white" />
                </div>
                <span className="text-gray-700 text-sm font-medium">France</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                  <Clock size={16} className="text-white" />
                </div>
                <span className="text-gray-700 text-sm font-medium">Disponible 24/7</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
              <h3 className="font-bold text-lg text-gray-900">Navigation</h3>
            </div>
            <ul className="space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-3 group p-2 rounded-lg hover:bg-white"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                        <Icon size={16} className="text-indigo-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="flex-1 font-medium">{item.label}</span>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
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
              <h3 className="font-bold text-lg text-gray-900">Contact</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@quifaitquoi.fr" 
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-3 group p-2 rounded-lg hover:bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                    <Mail size={16} className="text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm break-all font-medium">contact@quifaitquoi.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33123456789" 
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-3 group p-2 rounded-lg hover:bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                    <Phone size={16} className="text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium">01 23 45 67 89</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Séparateur avec design */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-gray-100">
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
          <p className="text-sm text-gray-500 font-medium">
            © 2026 Qui fait quoi. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/mentions-legales" 
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white font-medium"
            >
              Mentions légales
            </Link>
            <Link 
              href="/confidentialite" 
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white font-medium"
            >
              Confidentialité
            </Link>
            <Link 
              href="/cgu" 
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white font-medium"
            >
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
