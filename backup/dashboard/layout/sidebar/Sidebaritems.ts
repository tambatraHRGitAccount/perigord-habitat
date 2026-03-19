import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Dashboard',
    children: [
      {
        name: "Tableau de bord",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/dashboard",
        isPro: false
      },
    ],
  },
  {
    heading: 'Gestion des incidents',
    children: [
      {
        name: "Incidents",
        icon: "solar:danger-triangle-line-duotone",
        id: uniqueId(),
        url: "/dashboard/incidents",
        isPro: false,
        children: [
          {
            name: "Tous les incidents",
            id: uniqueId(),
            url: "/dashboard/incidents",
            isPro: false
          },
          {
            name: "Nouveaux",
            id: uniqueId(),
            url: "/dashboard/incidents/nouveaux",
            isPro: false
          },
          {
            name: "En cours",
            id: uniqueId(),
            url: "/dashboard/incidents/en-cours",
            isPro: false
          },
          {
            name: "Résolus",
            id: uniqueId(),
            url: "/dashboard/incidents/resolus",
            isPro: false
          },
        ],
      },
      {
        name: "Médias",
        icon: "solar:gallery-line-duotone",
        id: uniqueId(),
        url: "/dashboard/medias",
        isPro: false
      },
    ],
  },
  {
    heading: 'Gestion des bailleurs',
    children: [
      {
        name: "Bailleurs",
        icon: "solar:buildings-2-line-duotone",
        id: uniqueId(),
        url: "/dashboard/bailleurs",
        isPro: false
      },
      {
        name: "Logements",
        icon: "solar:home-2-line-duotone",
        id: uniqueId(),
        url: "/dashboard/logements",
        isPro: false
      },
      {
        name: "Locataires",
        icon: "solar:users-group-rounded-line-duotone",
        id: uniqueId(),
        url: "/dashboard/locataires",
        isPro: false
      },
    ],
  },
  {
    heading: 'Base de connaissances',
    children: [
      {
        name: "Pièces",
        icon: "solar:home-angle-line-duotone",
        id: uniqueId(),
        url: "/dashboard/pieces",
        isPro: false
      },
      {
        name: "Équipements",
        icon: "solar:settings-line-duotone",
        id: uniqueId(),
        url: "/dashboard/equipements",
        isPro: false
      },
      {
        name: "Pannes",
        icon: "solar:document-text-line-duotone",
        id: uniqueId(),
        url: "/dashboard/pannes",
        isPro: false
      },
    ],
  },
]

export default SidebarContent
