'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { rooms, PALETTE } from '@/components/house3d/houseData'
import { Room } from '@/components/house3d/Room'
import type { Piece } from '@/types/materiel'

const PIECE_TO_ROOM: Record<Exclude<Piece, 'Tous'>, string> = {
  'Salle de séjour': 'sejour',
  'Cuisine':         'cuisine',
  'Salle de bain':   'salle-de-bain',
  'Extérieur':       'exterieur',
}

interface CamConfig {
  position: [number, number, number]
  target:   [number, number, number]
  zoom:     number
}

const CAM: Record<string, CamConfig> = {
  sejour: {
    position: [14, 10, 10],
    target:   [3, 0.5, -3],
    zoom:     48,
  },
  cuisine: {
    position: [18, 10, 10],
    target:   [8.7, 0.5, -3],
    zoom:     50,
  },
  'salle-de-bain': {
    position: [10, 10, -2],
    target:   [2.5, 0.5, -8.2],
    zoom:     55,
  },
  exterieur: {
    position: [5, 18, 22],
    target:   [5.25, 0, 5],
    zoom:     35,
  },
}

interface Props {
  piece: Exclude<Piece, 'Tous'>
}

export function Room3DView({ piece }: Props) {
  const roomId = PIECE_TO_ROOM[piece]
  const room   = rooms.find(r => r.id === roomId)
  const cam    = CAM[roomId]

  if (!room || !cam) return null

  const cx = room.position[0] + room.size[0] / 2
  const cz = room.position[2] - room.size[2] / 2

  return (
    <Canvas
      orthographic
      camera={{ position: cam.position, zoom: cam.zoom, near: 0.1, far: 300 }}
      gl={{ antialias: true, powerPreference: 'low-power', toneMapping: THREE.NoToneMapping }}
      className="!touch-none"
    >
      <color attach="background" args={[PALETTE.background]} />

      {/* Éclairage identique à HouseScene */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[10, 15, 8]}  intensity={0.4} />
      <directionalLight position={[-5, 10, -5]} intensity={0.15} />

      {/* Sol étendu */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, -0.02, cz]}>
        <planeGeometry args={[room.size[0] + 6, room.size[2] + 6]} />
        <meshBasicMaterial color={PALETTE.background} />
      </mesh>

      {/* Pièce avec tout son équipement */}
      <Room
        room={room}
        onSelectEquipment={() => {}}
        selectedEquipment={null}
      />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        target={cam.target}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.2}
        minZoom={20}
        maxZoom={150}
        mouseButtons={{
          LEFT:   THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT:  THREE.MOUSE.PAN,
        }}
      />
    </Canvas>
  )
}
