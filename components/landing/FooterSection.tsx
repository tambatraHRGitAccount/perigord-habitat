"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, MessageSquare, FileText, Mail } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="w-full px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo-default.png" alt="Qui fait quoi" width={32} height={32} className="rounded" />
              <span className="font-semibold text-lg">Qui fait quoi ?</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-4">
              Votre assistant pour comprendre, diagnostiquer et résoudre les problèmes de votre logement.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Qui fait quoi. Tous droits réservés.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Home size={16} />
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/client/chat" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <MessageSquare size={16} />
                  Assistant IA
                </Link>
              </li>
              <li>
                <Link href="/client/materiels" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <FileText size={16} />
                  Matériels
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@quifaitquoi.fr" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  contact@quifaitquoi.fr
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
