'use client';
import { useScene } from '@/hooks/useSceneStore';
import type { ModeCamera } from '@/types/maison';

const modes: { id: ModeCamera; label: string; icon: string }[] = [
  { id: 'orbite', label: 'Orbit', icon: '🔄' },
  { id: 'visite', label: 'Visit', icon: '🚶' },
];

export function CameraControls() {
  const { modeCamera, setModeCamera } = useScene();

  return (
    <div className="flex gap-1">
      {modes.map(m => (
        <button
          key={m.id}
          onClick={() => setModeCamera(m.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${modeCamera === m.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
        >
          <span>{m.icon}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
