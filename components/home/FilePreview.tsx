"use client";

import { useEffect, useState } from "react";
import { X, Paperclip } from "lucide-react";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  useEffect(() => {
    if (isImage || isVideo) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, isImage, isVideo]);

  return (
    <div className="relative w-fit">
      {isImage && objectUrl ? (
        /* Aperçu image */
        <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm w-10 h-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={objectUrl} alt={file.name} className="w-full h-full object-cover" title={file.name} />
        </div>
      ) : isVideo && objectUrl ? (
        /* Aperçu vidéo */
        <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm w-10 h-10">
          <video src={objectUrl} className="w-full h-full object-cover" muted preload="metadata" title={file.name} />
        </div>
      ) : (
        /* Fichier générique */
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700">
          <Paperclip className="w-3 h-3 shrink-0" />
          <span className="truncate max-w-[200px]">{file.name}</span>
        </div>
      )}

      {/* Bouton supprimer */}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-5 h-5 bg-gray-700 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
