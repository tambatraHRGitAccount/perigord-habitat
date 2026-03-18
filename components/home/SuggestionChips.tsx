const SUGGESTIONS = [
  "Qui répare une fuite d'eau ?",
  "Mon chauffage est en panne, que faire ?",
  "La serrure est cassée, c'est à qui ?",
  "Comment signaler un dégât des eaux ?",
];

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-2xl">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="text-sm px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 text-gray-600 hover:text-indigo-700 transition-all"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
