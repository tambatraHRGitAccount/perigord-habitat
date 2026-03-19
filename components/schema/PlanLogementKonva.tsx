'use client'

import { useState, useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Line, Text, Circle, Group } from 'react-konva'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { ZoomIn, ZoomOut, Maximize2, Lightbulb } from 'lucide-react'
import Konva from 'konva'

interface Probleme {
  nom: string
  responsable: string
  quiPaie: string
  faIcon: IconDefinition
  reference: string
  diagnostic: string[]
  solution: string
}

interface PieceBase {
  id: string
  nom: string
  color: string
  faIcon: IconDefinition
  problemes: Probleme[]
}

interface Piece extends PieceBase {
  x: number
  y: number
  width: number
  height: number
  emoji: string
}

interface PlanLogementKonvaProps {
  pieces: PieceBase[]
  onPieceClick: (piece: PieceBase) => void
  selectedPieceId: string | null
}

export default function PlanLogementKonva({ pieces, onPieceClick, selectedPieceId }: PlanLogementKonvaProps) {
  const [hoveredPieceId, setHoveredPieceId] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const stageRef = useRef<Konva.Stage>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Adapter les dimensions au conteneur
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 64 // padding
        const height = Math.max(600, window.innerHeight - 400) // hauteur minimale 600px
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Définition du plan de logement (proportions relatives)
  const baseWidth = 760
  const baseHeight = 470
  const scaleRatio = Math.min(dimensions.width / baseWidth, dimensions.height / baseHeight)
  
  const planPieces: Piece[] = [
    {
      ...pieces.find(p => p.id === 'sejour')!,
      x: 50 * scaleRatio,
      y: 50 * scaleRatio,
      width: 300 * scaleRatio,
      height: 250 * scaleRatio,
      emoji: '🏠'
    },
    {
      ...pieces.find(p => p.id === 'cuisine')!,
      x: 370 * scaleRatio,
      y: 50 * scaleRatio,
      width: 200 * scaleRatio,
      height: 150 * scaleRatio,
      emoji: '🍳'
    },
    {
      ...pieces.find(p => p.id === 'salle-de-bain')!,
      x: 370 * scaleRatio,
      y: 220 * scaleRatio,
      width: 200 * scaleRatio,
      height: 130 * scaleRatio,
      emoji: '🚿'
    },
    {
      ...pieces.find(p => p.id === 'exterieur')!,
      x: 50 * scaleRatio,
      y: 320 * scaleRatio,
      width: 520 * scaleRatio,
      height: 100 * scaleRatio,
      emoji: '🌳'
    },
  ]

  const getColorFromGradient = (colorClass: string) => {
    if (colorClass.includes('blue')) return '#3b82f6'
    if (colorClass.includes('orange')) return '#f97316'
    if (colorClass.includes('cyan')) return '#06b6d4'
    if (colorClass.includes('green')) return '#22c55e'
    return '#6366f1'
  }

  const handlePieceClick = (piece: PieceBase) => {
    onPieceClick(piece)
  }

  // Gestion du zoom avec la molette
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()
    
    const stage = stageRef.current
    if (!stage) return

    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()
    if (!pointer) return

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    const direction = e.evt.deltaY > 0 ? -1 : 1
    const newScale = direction > 0 ? oldScale * 1.1 : oldScale / 1.1

    // Limiter le zoom entre 0.5x et 3x
    const limitedScale = Math.max(0.5, Math.min(3, newScale))

    setScale(limitedScale)
    
    const newPos = {
      x: pointer.x - mousePointTo.x * limitedScale,
      y: pointer.y - mousePointTo.y * limitedScale,
    }
    setPosition(newPos)
  }

  // Zoom avec les boutons
  const handleZoomIn = () => {
    const newScale = Math.min(3, scale * 1.2)
    setScale(newScale)
  }

  const handleZoomOut = () => {
    const newScale = Math.max(0.5, scale / 1.2)
    setScale(newScale)
  }

  // Réinitialiser le zoom
  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div className="w-full">
      {/* Contrôles de zoom - Design moderne */}
      <div className="flex justify-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-xl border-2 border-gray-200">
          <button
            onClick={handleZoomOut}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white rounded-xl transition-all duration-300 text-gray-700 group"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">-</span>
          </button>
          
          <div className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white min-w-[50px] text-center">
                {Math.round(scale * 100)}%
              </span>
            </div>
          </div>
          
          <button
            onClick={handleZoomIn}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white rounded-xl transition-all duration-300 text-gray-700 group"
            title="Zoom In"
          >
            <span className="text-sm font-semibold">+</span>
            <ZoomIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={handleResetZoom}
            className="ml-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 text-gray-700 text-sm font-medium"
            title="Reset View"
          >
            Reset
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="w-full flex justify-center bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-200 overflow-hidden relative"
        style={{ minHeight: '600px' }}
      >
        {/* Effet de grille subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        <Stage 
          width={dimensions.width} 
          height={dimensions.height} 
          ref={stageRef}
          scaleX={scale}
          scaleY={scale}
          x={position.x}
          y={position.y}
          draggable
          onWheel={handleWheel}
          onDragEnd={(e) => {
            setPosition({
              x: e.target.x(),
              y: e.target.y(),
            })
          }}
        >
        <Layer>
          {/* Ombre portée du bâtiment */}
          <Line
            points={[
              45 * scaleRatio, 45 * scaleRatio,
              585 * scaleRatio, 45 * scaleRatio,
              585 * scaleRatio, 435 * scaleRatio,
              45 * scaleRatio, 435 * scaleRatio,
              45 * scaleRatio, 45 * scaleRatio
            ]}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth={8}
            closed
            shadowBlur={20}
            shadowColor="rgba(0, 0, 0, 0.2)"
          />

          {/* ── Murs extérieurs (avec ouverture sur le balcon) ── */}
          {/* Haut */}
          <Line points={[40*scaleRatio, 40*scaleRatio, 580*scaleRatio, 40*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />
          {/* Droite – segment au-dessus de l'ouverture balcon */}
          <Line points={[580*scaleRatio, 40*scaleRatio, 580*scaleRatio, 68*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />
          {/* Droite – segment en-dessous de l'ouverture balcon */}
          <Line points={[580*scaleRatio, 192*scaleRatio, 580*scaleRatio, 430*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />
          {/* Bas */}
          <Line points={[580*scaleRatio, 430*scaleRatio, 40*scaleRatio, 430*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />
          {/* Gauche */}
          <Line points={[40*scaleRatio, 430*scaleRatio, 40*scaleRatio, 40*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />

          {/* Bordure intérieure lumineuse */}
          <Line
            points={[
              42 * scaleRatio, 42 * scaleRatio,
              578 * scaleRatio, 42 * scaleRatio,
              578 * scaleRatio, 428 * scaleRatio,
              42 * scaleRatio, 428 * scaleRatio,
              42 * scaleRatio, 42 * scaleRatio
            ]}
            stroke="#818cf8"
            strokeWidth={2}
            closed
            opacity={0.6}
          />

          {/* ── BALCON ── */}
          {/* Plancher du balcon (espace ouvert) */}
          <Rect
            x={580 * scaleRatio}
            y={68 * scaleRatio}
            width={120 * scaleRatio}
            height={124 * scaleRatio}
            fill="rgba(134, 239, 172, 0.18)"
          />
          {/* Mur haut du balcon */}
          <Line points={[580*scaleRatio, 68*scaleRatio, 700*scaleRatio, 68*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />
          {/* Mur bas du balcon */}
          <Line points={[580*scaleRatio, 192*scaleRatio, 700*scaleRatio, 192*scaleRatio]} stroke="#6366f1" strokeWidth={5} shadowBlur={15} shadowColor="#6366f1" />

          {/* Garde-fou – côté extérieur (droite) */}
          <Line
            points={[700*scaleRatio, 68*scaleRatio, 700*scaleRatio, 192*scaleRatio]}
            stroke="#60a5fa"
            strokeWidth={7}
            dash={[12, 7]}
            shadowBlur={12}
            shadowColor="#60a5fa"
          />
          {/* Poteaux du garde-fou */}
          {[82, 100, 118, 136, 154, 172].map((yPos, i) => (
            <Line
              key={`poteau-${i}`}
              points={[695*scaleRatio, yPos*scaleRatio, 705*scaleRatio, yPos*scaleRatio]}
              stroke="#60a5fa"
              strokeWidth={3}
            />
          ))}

          {/* Ouverture cuisine → balcon (porte coulissante) */}
          <Line
            points={[580*scaleRatio, 68*scaleRatio, 580*scaleRatio, 192*scaleRatio]}
            stroke="#a78bfa"
            strokeWidth={8}
            dash={[14, 6]}
            shadowBlur={10}
            shadowColor="#a78bfa"
          />

          {/* Label BALCON */}
          <Text
            x={588 * scaleRatio}
            y={114 * scaleRatio}
            text="BALCON"
            fontSize={13 * scaleRatio}
            fontStyle="bold"
            fill="#166534"
            shadowBlur={4}
            shadowColor="rgba(255,255,255,0.8)"
          />
          {/* Label garde-fou */}
          <Text
            x={588 * scaleRatio}
            y={132 * scaleRatio}
            text="garde-fou ›"
            fontSize={9 * scaleRatio}
            fill="#1d4ed8"
            opacity={0.7}
          />

          {/* Dessiner chaque pièce - Design futuriste */}
          {planPieces.map((piece) => {
            const isSelected = selectedPieceId === piece.id
            const isHovered = hoveredPieceId === piece.id
            const baseColor = getColorFromGradient(piece.color)
            
            return (
              <Group key={piece.id}>
                {/* Ombre de la pièce */}
                <Rect
                  x={piece.x + 3}
                  y={piece.y + 3}
                  width={piece.width}
                  height={piece.height}
                  fill="rgba(0, 0, 0, 0.3)"
                  cornerRadius={12}
                  blur={10}
                />
                
                {/* Rectangle de la pièce avec effet glassmorphism */}
                <Rect
                  x={piece.x}
                  y={piece.y}
                  width={piece.width}
                  height={piece.height}
                  fill={isSelected ? `${baseColor}60` : isHovered ? `${baseColor}40` : `${baseColor}25`}
                  stroke={isSelected ? baseColor : isHovered ? `${baseColor}80` : '#475569'}
                  strokeWidth={isSelected ? 4 : 2}
                  cornerRadius={12}
                  shadowBlur={isSelected ? 25 : isHovered ? 15 : 0}
                  shadowColor={baseColor}
                  onMouseEnter={() => setHoveredPieceId(piece.id)}
                  onMouseLeave={() => setHoveredPieceId(null)}
                  onClick={() => handlePieceClick(piece)}
                  onTap={() => handlePieceClick(piece)}
                />

                {/* Bordure intérieure lumineuse */}
                {(isSelected || isHovered) && (
                  <Rect
                    x={piece.x + 2}
                    y={piece.y + 2}
                    width={piece.width - 4}
                    height={piece.height - 4}
                    stroke={baseColor}
                    strokeWidth={1}
                    cornerRadius={10}
                    opacity={0.5}
                  />
                )}

                {/* Badge avec icône stylisée */}
                <Rect
                  x={piece.x + 10 * scaleRatio}
                  y={piece.y + 10 * scaleRatio}
                  width={40 * scaleRatio}
                  height={40 * scaleRatio}
                  fill={baseColor}
                  cornerRadius={10}
                  shadowBlur={10}
                  shadowColor={baseColor}
                />
                
                {/* Icône simplifiée selon le type de pièce */}
                {piece.id === 'sejour' && (
                  <>
                    <Rect
                      x={piece.x + 18 * scaleRatio}
                      y={piece.y + 20 * scaleRatio}
                      width={24 * scaleRatio}
                      height={18 * scaleRatio}
                      fill="white"
                      cornerRadius={2}
                    />
                    <Line
                      points={[
                        piece.x + 30 * scaleRatio, piece.y + 20 * scaleRatio,
                        piece.x + 30 * scaleRatio, piece.y + 14 * scaleRatio,
                        piece.x + 24 * scaleRatio, piece.y + 18 * scaleRatio,
                        piece.x + 36 * scaleRatio, piece.y + 18 * scaleRatio,
                        piece.x + 30 * scaleRatio, piece.y + 14 * scaleRatio
                      ]}
                      fill="white"
                      closed
                    />
                  </>
                )}
                {piece.id === 'cuisine' && (
                  <>
                    <Rect
                      x={piece.x + 20 * scaleRatio}
                      y={piece.y + 18 * scaleRatio}
                      width={20 * scaleRatio}
                      height={16 * scaleRatio}
                      fill="white"
                      cornerRadius={2}
                    />
                    <Circle
                      x={piece.x + 25 * scaleRatio}
                      y={piece.y + 24 * scaleRatio}
                      radius={3 * scaleRatio}
                      fill={baseColor}
                    />
                    <Circle
                      x={piece.x + 35 * scaleRatio}
                      y={piece.y + 24 * scaleRatio}
                      radius={3 * scaleRatio}
                      fill={baseColor}
                    />
                  </>
                )}
                {piece.id === 'salle-de-bain' && (
                  <>
                    <Circle
                      x={piece.x + 30 * scaleRatio}
                      y={piece.y + 22 * scaleRatio}
                      radius={4 * scaleRatio}
                      fill="white"
                    />
                    <Line
                      points={[
                        piece.x + 30 * scaleRatio, piece.y + 26 * scaleRatio,
                        piece.x + 30 * scaleRatio, piece.y + 32 * scaleRatio
                      ]}
                      stroke="white"
                      strokeWidth={2}
                    />
                    <Line
                      points={[
                        piece.x + 22 * scaleRatio, piece.y + 36 * scaleRatio,
                        piece.x + 38 * scaleRatio, piece.y + 36 * scaleRatio
                      ]}
                      stroke="white"
                      strokeWidth={3}
                      lineCap="round"
                    />
                  </>
                )}
                {piece.id === 'exterieur' && (
                  <>
                    <Line
                      points={[
                        piece.x + 30 * scaleRatio, piece.y + 34 * scaleRatio,
                        piece.x + 30 * scaleRatio, piece.y + 20 * scaleRatio
                      ]}
                      stroke="white"
                      strokeWidth={3}
                    />
                    <Circle
                      x={piece.x + 26 * scaleRatio}
                      y={piece.y + 18 * scaleRatio}
                      radius={5 * scaleRatio}
                      fill="white"
                    />
                    <Circle
                      x={piece.x + 34 * scaleRatio}
                      y={piece.y + 22 * scaleRatio}
                      radius={4 * scaleRatio}
                      fill="white"
                    />
                  </>
                )}

                {/* Nom de la pièce */}
                <Text
                  x={piece.x + 60 * scaleRatio}
                  y={piece.y + 15 * scaleRatio}
                  text={piece.nom.toUpperCase()}
                  fontSize={16 * scaleRatio}
                  fontStyle="bold"
                  fill="#ffffff"
                  shadowBlur={5}
                  shadowColor="rgba(0, 0, 0, 0.5)"
                  onClick={() => handlePieceClick(piece)}
                  onTap={() => handlePieceClick(piece)}
                />

                {/* Badge nombre de problèmes */}
                <Rect
                  x={piece.x + 60 * scaleRatio}
                  y={piece.y + 35 * scaleRatio}
                  width={80 * scaleRatio}
                  height={20 * scaleRatio}
                  fill="rgba(0, 0, 0, 0.4)"
                  cornerRadius={10}
                />
                
                <Text
                  x={piece.x + 68 * scaleRatio}
                  y={piece.y + 39 * scaleRatio}
                  text={`${piece.problemes.length} issues`}
                  fontSize={11 * scaleRatio}
                  fill="#e2e8f0"
                  fontStyle="bold"
                  onClick={() => handlePieceClick(piece)}
                  onTap={() => handlePieceClick(piece)}
                />

                {/* Indicateur de sélection animé */}
                {isSelected && (
                  <>
                    <Circle
                      x={piece.x + piece.width - 20 * scaleRatio}
                      y={piece.y + 20 * scaleRatio}
                      radius={12 * scaleRatio}
                      fill={baseColor}
                      shadowBlur={15}
                      shadowColor={baseColor}
                    />
                    <Circle
                      x={piece.x + piece.width - 20 * scaleRatio}
                      y={piece.y + 20 * scaleRatio}
                      radius={8 * scaleRatio}
                      fill="white"
                    />
                  </>
                )}
                
                {/* Effet de hover - coins lumineux */}
                {isHovered && !isSelected && (
                  <>
                    <Line points={[piece.x, piece.y, piece.x + 20 * scaleRatio, piece.y]} stroke={baseColor} strokeWidth={3} />
                    <Line points={[piece.x, piece.y, piece.x, piece.y + 20 * scaleRatio]} stroke={baseColor} strokeWidth={3} />
                    <Line points={[piece.x + piece.width, piece.y, piece.x + piece.width - 20 * scaleRatio, piece.y]} stroke={baseColor} strokeWidth={3} />
                    <Line points={[piece.x + piece.width, piece.y, piece.x + piece.width, piece.y + 20 * scaleRatio]} stroke={baseColor} strokeWidth={3} />
                  </>
                )}
              </Group>
            )
          })}

          {/* Portes - Design futuriste */}
          <Line
            points={[350 * scaleRatio, 50 * scaleRatio, 370 * scaleRatio, 50 * scaleRatio]}
            stroke="#a78bfa"
            strokeWidth={8}
            shadowBlur={10}
            shadowColor="#a78bfa"
          />
          <Line
            points={[370 * scaleRatio, 200 * scaleRatio, 370 * scaleRatio, 220 * scaleRatio]}
            stroke="#a78bfa"
            strokeWidth={8}
            shadowBlur={10}
            shadowColor="#a78bfa"
          />
          <Line
            points={[200 * scaleRatio, 300 * scaleRatio, 200 * scaleRatio, 320 * scaleRatio]}
            stroke="#a78bfa"
            strokeWidth={8}
            shadowBlur={10}
            shadowColor="#a78bfa"
          />

          {/* Fenêtres - Design futuriste */}
          <Line
            points={[150 * scaleRatio, 40 * scaleRatio, 250 * scaleRatio, 40 * scaleRatio]}
            stroke="#60a5fa"
            strokeWidth={10}
            dash={[15, 8]}
            shadowBlur={15}
            shadowColor="#60a5fa"
          />
          <Line
            points={[470 * scaleRatio, 40 * scaleRatio, 520 * scaleRatio, 40 * scaleRatio]}
            stroke="#60a5fa"
            strokeWidth={10}
            dash={[15, 8]}
            shadowBlur={15}
            shadowColor="#60a5fa"
          />
        </Layer>
      </Stage>
      </div>

      {/* Instructions - Design moderne */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 shadow-lg">
          <Lightbulb className="w-5 h-5 text-indigo-600" />
          <p className="text-sm text-gray-700 font-medium">
            <span className="text-indigo-600 font-semibold">Scroll</span> to zoom • 
            <span className="text-purple-600 font-semibold"> Drag</span> to move • 
            <span className="text-cyan-600 font-semibold"> Click</span> to select
          </p>
        </div>
      </div>
    </div>
  )
}
