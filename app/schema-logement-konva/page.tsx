'use client'

import dynamic from 'next/dynamic'
import { HeaderApp } from '@/components/layout/HeaderApp'

const HouseScene = dynamic(() => import('@/components/house3d/HouseScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Chargement de la maison 3D...</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Préparation de la scène interactive</p>
      </div>
    </div>
  ),
})

export default function SchemaLogement3D() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <HeaderApp/>

      {/* 3D Scene */}
      <div className="flex-1 relative">
        <HouseScene />
      </div>
    </div>
  )
}
