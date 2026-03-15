'use client'

import { useState } from 'react'
import { Search, Wrench, BookOpen, ArrowLeft } from 'lucide-react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faPaintRoller,
  faPlug,
  faWindowMaximize,
  faSquare,
  faTemperatureHalf,
  faFire,
  faSink,
  faDroplet,
  faKey,
  faRadiation,
  faPhone,
  faScrewdriverWrench,
  faToilet,
  faShower,
  faWind,
  faDoorClosed,
  faHouseChimney,
  faCar,
  faSeedling,
  faFireBurner,
  faWater,
  faCircleExclamation,
  faCircleCheck,
  faInfoCircle,
} from '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import PieceCard from '@/components/schema/PieceCard'
import ProblemeDetail from '@/components/schema/ProblemeDetail'
import Link from 'next/link'

const PlanLogementKonva = dynamic(() => import('@/components/schema/PlanLogementKonva'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex justify-center bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du plan...</p>
      </div>
    </div>
  ),
})

export default function SchemaLogementKonva() {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [selectedProbleme, setSelectedProbleme] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const pieces = [
    {
      id: 'sejour',
      nom: 'Séjour',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      faIcon: faHouseChimney,
      problemes: [
        { 
          nom: 'Papier peint décollé ou crayonné', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faPaintRoller,
          reference: 'Décret n°87-712 : Entretien des revêtements muraux',
          diagnostic: ['Vérifier l\'étendue des dégâts', 'Identifier la cause (humidité, usure normale)'],
          solution: 'Recoller ou remplacer le papier peint. Si dégradation locative, à votre charge.'
        },
        { 
          nom: 'Interrupteur ou prise électrique en panne', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faPlug,
          reference: 'Décret n°87-712 : Entretien courant des installations électriques',
          diagnostic: ['Couper le courant au disjoncteur', 'Vérifier les fusibles', 'Tester avec un autre appareil'],
          solution: 'Remplacement des interrupteurs et prises défectueux à votre charge.'
        },
        { 
          nom: 'Volet ne ferme plus', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faWindowMaximize,
          reference: 'Décret n°87-712 : Petites réparations de menuiserie',
          diagnostic: ['Vérifier la manivelle', 'Contrôler la sangle', 'Inspecter le mécanisme'],
          solution: 'Réparation manivelle, sangle, treuil à votre charge. Remplacement complet = bailleur.'
        },
        { 
          nom: 'Sol abîmé (parquet, carrelage)', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faSquare,
          reference: 'Décret n°87-712 : Entretien des revêtements de sol',
          diagnostic: ['Évaluer l\'étendue des dégâts', 'Déterminer si c\'est de l\'usure normale ou dégradation'],
          solution: 'Entretien courant et petites réparations à votre charge. Vitrification parquet incluse.'
        },
        { 
          nom: 'Thermostat défaillant', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faTemperatureHalf,
          reference: 'Décret n°87-712 : Entretien des appareils de chauffage',
          diagnostic: ['Vérifier les piles', 'Nettoyer le thermostat', 'Tester le réglage'],
          solution: 'Nettoyage et remplacement des piles à votre charge.'
        },
        { 
          nom: 'Détecteur de fumée (DAAF)', 
          responsable: 'contrat', 
          quiPaie: 'bailleur_recuperable',
          faIcon: faFire,
          reference: 'Loi Morange 2010 : Entretien DAAF',
          diagnostic: ['Tester le détecteur', 'Vérifier la pile'],
          solution: 'Entretien et remplacement pile = bailleur via contrat d\'entretien (charges récupérables).'
        },
      ]
    },
    {
      id: 'cuisine',
      nom: 'Cuisine',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      faIcon: faSink,
      problemes: [
        { 
          nom: 'Évier bouché', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faSink,
          reference: 'Décret n°87-712 : Dégorgement des appareils sanitaires',
          diagnostic: ['Retirer le siphon', 'Utiliser une ventouse', 'Vérifier l\'évacuation'],
          solution: 'Débouchage à votre charge. Utilisez ventouse, furet ou produit déboucheur.'
        },
        { 
          nom: 'Robinet qui fuit', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faDroplet,
          reference: 'Décret n°87-712 : Entretien de la robinetterie',
          diagnostic: ['Identifier la source de la fuite', 'Vérifier les joints', 'Contrôler le mousseur'],
          solution: 'Changement des joints et petites réparations à votre charge. Ne pas attendre (facture d\'eau).'
        },
        { 
          nom: 'Serrure fonctionne mal', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faKey,
          reference: 'Décret n°87-712 : Entretien des serrures',
          diagnostic: ['Lubrifier la serrure', 'Vérifier la clé', 'Tester le mécanisme'],
          solution: 'Réparation et remplacement des clés perdues/cassées à votre charge.'
        },
        { 
          nom: 'Radiateur chauffe mal', 
          responsable: 'contrat', 
          quiPaie: 'bailleur_recuperable',
          faIcon: faRadiation,
          reference: 'Contrat d\'entretien chauffage collectif',
          diagnostic: ['Vérifier si le radiateur est ouvert', 'Purger le radiateur', 'Contrôler la vanne'],
          solution: 'Contacter le titulaire du contrat d\'entretien. Purge et réparation vanne = contrat.'
        },
        { 
          nom: 'Radiateur électrique HS', 
          responsable: 'bailleur', 
          quiPaie: 'bailleur',
          faIcon: faPlug,
          reference: 'Décret n°87-712 : Remplacement d\'équipement',
          diagnostic: ['Vérifier l\'alimentation électrique', 'Tester le thermostat', 'Contrôler le disjoncteur'],
          solution: 'Remplacement du convecteur = bailleur. Refixation au mur = locataire.'
        },
        { 
          nom: 'Interphone / Sonnette', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faPhone,
          reference: 'Décret n°87-712 : Entretien des équipements',
          diagnostic: ['Vérifier les piles', 'Tester le bouton', 'Contrôler le câblage'],
          solution: 'Entretien à votre charge.'
        },
      ]
    },
    {
      id: 'salle-de-bain',
      nom: 'Salle de bain',
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      faIcon: faShower,
      problemes: [
        { 
          nom: 'Joints plus étanches', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faScrewdriverWrench,
          reference: 'Décret n°87-712 : Changement des joints',
          diagnostic: ['Inspecter l\'état des joints', 'Vérifier s\'il y a des moisissures', 'Tester l\'étanchéité'],
          solution: 'Changement des joints sanitaires et menuiseries à votre charge (sauf si contrat spécifique).'
        },
        { 
          nom: 'Chasse d\'eau qui coule', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faToilet,
          reference: 'Décret n°87-712 : Entretien des WC',
          diagnostic: ['Fermer le robinet d\'arrêt', 'Vérifier le flotteur', 'Contrôler le joint du mécanisme'],
          solution: 'Changer le joint, les écrous avec joints. Mécanisme complet si nécessaire.'
        },
        { 
          nom: 'Robinet qui fuit', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faShower,
          reference: 'Décret n°87-712 : Entretien de la robinetterie',
          diagnostic: ['Identifier la source', 'Vérifier les joints', 'Contrôler le col de cygne'],
          solution: 'En général à votre charge. Ne pas attendre (facture d\'eau importante).'
        },
        { 
          nom: 'Grille de ventilation', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faWind,
          reference: 'Décret n°87-712 : Entretien des grilles',
          diagnostic: ['Nettoyer la grille', 'Vérifier qu\'elle n\'est pas bouchée', 'Ne jamais obstruer'],
          solution: 'Nettoyage à votre charge. Remplacement si cassée = locataire.'
        },
        { 
          nom: 'Cumulus / Chauffe-eau', 
          responsable: 'contrat', 
          quiPaie: 'bailleur_recuperable',
          faIcon: faFireBurner,
          reference: 'Contrat d\'entretien chauffe-eau',
          diagnostic: ['Vérifier l\'eau chaude', 'Contrôler le disjoncteur', 'Inspecter les fuites'],
          solution: 'Couvert par contrat d\'entretien bailleur (charges récupérables).'
        },
      ]
    },
    {
      id: 'exterieur',
      nom: 'Extérieur',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      faIcon: faSeedling,
      problemes: [
        { 
          nom: 'Cave sale', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faDoorClosed,
          reference: 'Décret n°87-712 : Entretien des locaux loués',
          diagnostic: ['Nettoyer régulièrement', 'Vérifier l\'humidité', 'Aérer'],
          solution: 'Entretien de tous les locaux loués (cave, garage, cellier) à votre charge.'
        },
        { 
          nom: 'Balcon évacuation bouchée', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faHouseChimney,
          reference: 'Décret n°87-712 : Débouchage',
          diagnostic: ['Retirer les feuilles', 'Nettoyer la grille', 'Déboucher le siphon'],
          solution: 'Débouchage à votre charge.'
        },
        { 
          nom: 'Entretien pelouse / haies', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faSeedling,
          reference: 'Décret n°87-712 : Entretien espaces verts privatifs',
          diagnostic: ['Tondre régulièrement', 'Tailler les haies', 'Désherber'],
          solution: 'Tonte et taille à votre charge si jardin privatif.'
        },
        { 
          nom: 'Garage (poignée, serrure)', 
          responsable: 'locataire', 
          quiPaie: 'locataire',
          faIcon: faCar,
          reference: 'Décret n°87-712 : Entretien courant',
          diagnostic: ['Lubrifier la serrure', 'Vérifier la poignée', 'Tester le mécanisme'],
          solution: 'Entretien courant à votre charge.'
        },
        { 
          nom: 'Chaudière', 
          responsable: 'contrat', 
          quiPaie: 'bailleur_recuperable',
          faIcon: faFireBurner,
          reference: 'Contrat d\'entretien obligatoire',
          diagnostic: ['Vérifier la pression', 'Contrôler l\'eau chaude', 'Inspecter les fuites'],
          solution: 'Sous contrat d\'entretien (charges récupérables).'
        },
        { 
          nom: 'VMC', 
          responsable: 'contrat', 
          quiPaie: 'bailleur_recuperable',
          faIcon: faWind,
          reference: 'Contrat d\'entretien VMC',
          diagnostic: ['Vérifier le fonctionnement', 'Nettoyer les grilles', 'Contrôler le bruit'],
          solution: 'Sous contrat d\'entretien (charges récupérables).'
        },
        { 
          nom: 'Fosse septique', 
          responsable: 'contrat', 
          quiPaie: 'bailleur_recuperable',
          faIcon: faWater,
          reference: 'Contrat d\'entretien fosse',
          diagnostic: ['Vidange régulière', 'Contrôle du niveau', 'Inspection'],
          solution: 'Sous contrat d\'entretien (charges récupérables).'
        },
      ]
    },
  ]

  const getResponsableColor = (responsable: string) => {
    switch (responsable) {
      case 'locataire': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'bailleur': return 'bg-red-100 text-red-800 border-red-300'
      case 'contrat': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getResponsableBadge = (responsable: string) => {
    switch (responsable) {
      case 'locataire': return { text: 'LOCATAIRE', color: 'bg-orange-500', icon: faCircleExclamation }
      case 'bailleur': return { text: 'BAILLEUR', color: 'bg-red-500', icon: faCircleExclamation }
      case 'contrat': return { text: 'CONTRAT', color: 'bg-blue-500', icon: faCircleCheck }
      default: return { text: 'À VÉRIFIER', color: 'bg-gray-400', icon: faInfoCircle }
    }
  }

  const getQuiPaieText = (quiPaie: string) => {
    switch (quiPaie) {
      case 'locataire': return 'Vous payez'
      case 'bailleur': return 'Le bailleur paie'
      case 'bailleur_recuperable': return 'Bailleur (récupérable via charges)'
      default: return 'À déterminer'
    }
  }

  const selectedPieceData = pieces.find(p => p.id === selectedPiece)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8 text-indigo-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Qui fait quoi ?</h1>
            </div>
            <Link 
              href="/schema-logement"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Version liste</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un problème... (ex: robinet qui fuit)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-base sm:text-lg shadow-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Plan interactif de votre logement
          </h2>
          <p className="text-gray-600">
            Cliquez sur une pièce du plan pour voir les équipements et identifier qui doit intervenir
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-gray-900 text-lg">Guide "Qui fait quoi / Qui paie quoi"</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Basé sur le Décret n°87-712 du 26 août 1987 relatif aux réparations locatives
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Locataire</p>
                <p className="text-xs text-gray-600">Entretien courant</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Bailleur</p>
                <p className="text-xs text-gray-600">Grosses réparations</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Contrat</p>
                <p className="text-xs text-gray-600">Charges récupérables</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">À vérifier</p>
                <p className="text-xs text-gray-600">Contactez l'agence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Konva */}
        <PlanLogementKonva
          pieces={pieces}
          onPieceClick={(piece) => setSelectedPiece(piece.id)}
          selectedPieceId={selectedPiece}
        />

        {/* Selected Piece Details */}
        {selectedPieceData && (
          <div className="mt-8">
            <PieceCard
              piece={selectedPieceData}
              isSelected={true}
              onSelect={() => setSelectedPiece(null)}
              onProblemeClick={(probleme) => setSelectedProbleme(probleme)}
              getResponsableColor={getResponsableColor}
            />
          </div>
        )}
      </main>

      {/* Modal for problem details */}
      {selectedProbleme && (
        <ProblemeDetail
          probleme={selectedProbleme}
          onClose={() => setSelectedProbleme(null)}
          getResponsableBadge={getResponsableBadge}
          getQuiPaieText={getQuiPaieText}
        />
      )}
    </div>
  )
}
