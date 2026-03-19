"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Save,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function ParametresPage() {
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsPush, setNotificationsPush] = useState(true);
  const [modeDebug, setModeDebug] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
          <Settings className="w-8 h-8 text-gray-600" />
          Paramètres
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configuration de la plateforme
        </p>
      </div>

      {/* Section Notifications */}
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-dark dark:text-white">Notifications</h2>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notif-email">Notifications par email</Label>
              <p className="text-sm text-gray-500">
                Recevoir les alertes par email
              </p>
            </div>
            <Switch
              id="notif-email"
              checked={notificationsEmail}
              onCheckedChange={setNotificationsEmail}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notif-push">Notifications push</Label>
              <p className="text-sm text-gray-500">
                Recevoir les notifications en temps réel
              </p>
            </div>
            <Switch
              id="notif-push"
              checked={notificationsPush}
              onCheckedChange={setNotificationsPush}
            />
          </div>
        </div>
      </div>

      {/* Section Sécurité */}
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-dark dark:text-white">Sécurité</h2>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div>
            <Label htmlFor="api-key">Clé API Supabase</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="api-key"
                type="password"
                placeholder="••••••••••••••••"
                className="flex-1"
              />
              <Button variant="outline">
                <Key className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="webhook-url">URL Webhook</Label>
            <Input
              id="webhook-url"
              placeholder="https://example.com/webhook"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Section Apparence */}
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-dark dark:text-white">Apparence</h2>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div>
            <Label htmlFor="theme">Thème</Label>
            <Select defaultValue="light">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Clair</SelectItem>
                <SelectItem value="dark">Sombre</SelectItem>
                <SelectItem value="auto">Automatique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="langue">Langue</Label>
            <Select defaultValue="fr">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Section Base de données */}
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-dark dark:text-white">Base de données</h2>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div>
            <Label htmlFor="db-url">URL Supabase</Label>
            <Input
              id="db-url"
              placeholder="https://xxxxx.supabase.co"
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="mode-debug">Mode debug</Label>
              <p className="text-sm text-gray-500">
                Afficher les logs détaillés
              </p>
            </div>
            <Switch
              id="mode-debug"
              checked={modeDebug}
              onCheckedChange={setModeDebug}
            />
          </div>
        </div>
      </div>

      {/* Section Email */}
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-semibold text-dark dark:text-white">Configuration Email</h2>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div>
            <Label htmlFor="smtp-host">Serveur SMTP</Label>
            <Input
              id="smtp-host"
              placeholder="smtp.example.com"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-port">Port</Label>
              <Input
                id="smtp-port"
                placeholder="587"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="smtp-user">Utilisateur</Label>
              <Input
                id="smtp-user"
                placeholder="user@example.com"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réinitialiser
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
