"use client";

import type { Piece } from "@/types/materiel";

const ROOM_MAP: Record<string, Exclude<Piece, "Tous">> = {
  bedroom:    "Salle de séjour",
  kitchen:    "Cuisine",
  showerroom: "Salle de bain",
  livingroom: "Salle de séjour",
};

const ROOM_COLORS: Record<string, string> = {
  bedroom:    "rgba(99,102,241,0.35)",
  kitchen:    "rgba(245,158,11,0.35)",
  showerroom: "rgba(6,182,212,0.35)",
  livingroom: "rgba(16,185,129,0.35)",
};

interface PlanLogementProps {
  active: Piece;
  onChange: (piece: Piece) => void;
}

export function PlanLogement({ active, onChange }: PlanLogementProps) {
  const handleClick = (roomKey: string) => onChange(ROOM_MAP[roomKey]);

  // Overlay sur chaque pièce :
  // - pièce active → couleur accent
  // - pièce inactive (quand une autre est sélectionnée) → gris semi-transparent
  // - "Tous" → transparent (tout visible)
  const overlayColor = (roomKey: string): string => {
    if (active === "Tous") return "transparent";
    if (ROOM_MAP[roomKey] === active) return ROOM_COLORS[roomKey];
    return "rgba(200,210,220,0.55)";
  };

  // Les masques globaux ne sont plus nécessaires, on les cache toujours
  const maskHidden = (_roomKey: string) => true;

  const roomProps = (roomKey: string, label: string) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": label,
    "aria-pressed": active !== "Tous" && ROOM_MAP[roomKey] === active,
    onClick: () => handleClick(roomKey),
    onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && handleClick(roomKey),
    style: { cursor: "pointer" },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="130.8 91.2 1185.9 618.6"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Plan du logement interactif"
      >
        <defs>
          <style>{`
            .room { outline: none; }
            .room:focus-visible rect.focus-ring { stroke: #fff; stroke-width: 3; fill: none; }
          `}</style>
        </defs>

        {/* ── Chambre ── */}
        <g {...roomProps("bedroom", "Chambre")} className="room bedroom" transform="translate(551.20,99)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" id="bg-bedroom" width="563.8" height="490.4" x="0" y="0" version="1.1">
            <style>{`.st0,.st1,.st2,.st3{fill:#97c1db;stroke:#28316d;stroke-linecap:round;stroke-linejoin:round}.st1,.st2,.st3{fill:#fff}.st2,.st3{fill:#cce0ee}.st3{fill:none}.st4{fill:#fff}.st5,.st6{fill:#28316d;stroke:#28316d;stroke-linecap:round;stroke-linejoin:round}.st6{fill:#d3e2fc}.st8{fill:#cce0ee}`}</style>
            <g id="Bed_Room" transform="translate(-551.2 -99)">
              <path d="M793.4 271.5v-172L551.8 239l-.1 172.1z" className="st0"/><path d="M859.7 588.9 551.8 411.2 806.7 264l307.8 177.8z" className="st1"/><path d="m670.9 331.1 152.3-87.9 76.1 43.9-152.3 88z" className="st2"/><path d="M743.7 414.9 859.6 348l56.3 32.5L800 447.4z" className="st1"/><path d="m902.6 269.9 19.9 11.5 13.2-7.6-19.8-11.5z" className="st2"/><path d="m856.1 262.5 26.5-15.3 62.9 36.3-26.5 15.3z" className="st2"/><path d="M925.8 294.8v3.8" className="st3"/><path d="M568.3 409.5v-57.4l59.6-34.4v57.4z" className="st0"/><path d="m561.7 348.3 59.5-34.4 6.7 3.8-59.6 34.4z" className="st1"/><path d="m568.3 409.5-6.6-3.9v-57.3l6.6 3.8z" className="st2"/><path d="M617.9 323.5v57.3" className="st3"/><path d="M608 329.2v57.3" className="st3"/><path d="M598.1 334.9v57.4" className="st3"/><path d="M588.1 340.7V398" className="st3"/><path d="M578.2 346.4v57.3" className="st3"/><path d="m919.2 260 26.5 15.3-16.6 9.6-26.5-15.3z" className="st2"/><path d="m919.2 258 26.5 15.3-16.6 9.6-26.5-15.3z" className="st1"/><path d="M902.6 269.6v-2l26.5 15.3v2z" className="st2"/><path d="m929.1 282.9 16.6-9.6v2l-16.6 9.6z" className="st1"/><path d="M925.8 275.3v-76.4l-56.3-32.5v76.4z" className="st2"/><path d="M915.9 265v-39.8l-23.2-13.4v39.9z" className="st1"/><path d="M889.4 250.4v-39.8l-16.6-9.6v39.9z" className="st1"/><path d="M915.9 221.5v-24.9l-23.2-13.3v24.8z" className="st1"/><path d="M889.4 206.9v-24.8l-16.6-9.6v24.9z" className="st1"/><path d="m856.3 250.5 13.2-7.7 62.9 36.3-13.2 7.7z" className="st1"/><path d="m892.7 251.7 19.8 11.4v-3.8l-16.5-9.5z" className="st1"/><path d="m872.8 240.9 16.6 9.5v-3.8l-13.3-7.6z" className="st1"/><path d="m892.7 208.1 19.8 11.5v-3.8l-16.5-9.6z" className="st1"/><path d="m872.8 197.4 16.6 9.5v-3.8l-13.3-7.6z" className="st1"/><path d="M892.7 208.1v-13.8l3.3 1.9v10z" className="st0"/><path d="M892.7 251.7v-39.9l3.3 1.9v36.1z" className="st0"/><path d="M872.8 197.4v-13.8l3.3 1.9v10z" className="st0"/><path d="M872.8 240.9V201l3.3 1.9V239z" className="st0"/><path d="m856.3 174 6.6 72.6 6.6-3.8v-76.4z" className="st0"/><path d="m793.4 99.5-.3 172.3 314.4 182-6.3-176.5zm69.4 78.5 46.4 26.8v68.7l-46.3-26.8z" className="st2"/><path d="m968.8 334.6 3.3 1.9v42l-3.3-1.9z" className="st2"/><path d="m975.5 376.6-3.4 1.9v-42l3.4-1.9z" className="st0"/><path d="m886.1 313.6 3.3 1.9v42l-3.3-1.9z" className="st2"/><path d="m892.7 355.6-3.3 1.9v-42l3.3-1.9z" className="st0"/><path d="m952.3 390-3.3 1.9v-42l3.3-1.9z" className="st0"/><path d="m945.7 348 3.3 1.9v42l-3.3-1.9z" className="st2"/><path d="m909.2 300.2 3.3 1.9v42l-3.3-1.9z" className="st2"/><path d="m915.9 342.2-3.4 1.9v-42l3.4-1.9z" className="st0"/><path d="M949 349.9v-11.5l26.5-15.3v11.5z" className="st0"/><path d="m886.1 302.1 26.4-15.3 63 36.3-26.5 15.3z" className="st1"/><path d="M886.1 313.6v-11.5l62.9 36.3v11.5z" className="st2"/><path d="M945.7 340.3v3.8l-26.5-15.2-29.8-17.3v-3.8l29.8 17.2z" className="st2"/><path d="m641.1 359.5 149.1-86.1 76 44-149 86z" fill="#fff"/><path d="M856.3 319.3v-19.2l6.6-3.8v19.1z" className="st2"/><path d="M849.7 300.1v15.3l6.6 3.9v-19.2z" className="st2"/><path d="M717.2 403.4v-19.1l6.7-3.8v19.1z" className="st0"/><path d="M713.9 382.4v19.1l3.3 1.9v-19.1z" className="st2"/><path d="M641.1 340.3v19.2l3.3 1.9v-19.2z" className="st2"/><path d="M644.4 361.4v-19.2l6.6-3.8v19.1z" className="st0"/><path d="M717.2 395.7v-7.6l152.3-87.9v7.6z" className="st0"/><path d="m641.1 344.1 152.3-87.9 76.1 44-152.3 87.9z" className="st2"/><path d="M717.2 384.3v-11.5l-76.1-43.9v11.4z" className="st2"/><path d="m753.7 366.9-13.3-7.5 127.2-73.5v15.3z" className="st2"/><path d="M717.2 369v-7.6l-69.5-40.2v7.7z" className="st2"/><path d="M866 282.8c1.9 1.1 1.9 2.9 0 4l-138.7 80.1c-2.2 1.1-4.8 1.1-6.9 0l-62.6-36.1c-1.9-1.1-1.9-2.9 0-4l138.7-80.1c2.2-1.1 4.8-1.1 6.9 0z" fill="#fff"/><path d="M866 282.8c1.9 1.1 1.9 2.9 0 4l-138.7 80.1c-2.2 1.1-4.8 1.1-6.9 0l-62.6-36.1c-1.9-1.1-1.9-2.9 0-4l138.7-80.1c2.2-1.1 4.8-1.1 6.9 0z" className="st3"/><path d="M839.7 304.9v12.4l-16.5 9.7v-12.6c.2-1.7-.8-3.4-2.4-4l-67.2-35c-.8-.5-.1-.8.3-1.1 1.1-.6 11.3-6.9 14.8-8.9.4-.2 1.4.4 1.4.4l66.6 34.8c2.1.9 3 1.9 3 4.3" className="st1"/>
            </g>
          </svg>
          {/* Active color overlay */}
          <rect x="0" y="0" width="563.8" height="490.4" fill={overlayColor("bedroom")} pointerEvents="none" />
        </g>

        {/* ── Cuisine ── */}
        <g {...roomProps("kitchen", "Cuisine")} className="room kitchen" transform="translate(137.4,194.5)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" id="bg-kitchen" width="722.7" height="538.2" x="0" y="0" version="1.1">
            <style>{`.st0,.st1,.st2,.st3{fill:#97c1db;stroke:#28316d;stroke-linecap:round;stroke-linejoin:round}.st1,.st2,.st3{fill:#fff}.st2,.st3{fill:#cce0ee}.st3{fill:none}.st4{fill:#fff}.st5,.st9{fill:#28316d;stroke:#28316d;stroke-linecap:round;stroke-linejoin:round}.st9{fill:none;stroke:#cce0ee}`}</style>
            <g id="Kitchen" transform="translate(-137.4 -194.5)">
              <path d="M151.1 443.5c0-8.5 2.7-18.6 8.2-28.2 11-19.3 28.8-29.6 39.8-23 5.5 3.3 8.1 10.2 8.1 18.7l.1 107-56.3 32.5z" className="st2"/><path d="M154.5 445.4c0-8.5 2.7-18.6 8.2-28.2 11-19.3 28.8-29.6 39.8-23 5.5 3.3 8.1 10.2 8.1 18.7l.1 107-19.8 11.4L475.5 367V195L137.9 390v172l16.6-9.6z" className="st0"/><path d="M770.2 537.2 475.6 367.1 137.9 562l294.6 170.2z" className="st1"/><path d="m859.6 588.8-39.7-22.6v-138l-56.4-32.4.1 137.5-288-166.2v-172l135.7 78.3 152.3 88 96 55.4z" className="st2"/><path d="m770.2 399.6-6.7-3.8.1 137.5 6.6-3.8z" className="st0"/><path d="m591.4 563.9-102.6-59.2-188.7 108.9 102.7 59.3z" className="st2"/><path d="M404.5 595.8s-10.1-7.4-17.7-10.7-22.6 3.2-22.6 3.2L372 606l11.4 5.2s23.1-10.9 21.1-15.4" className="st2"/><path d="M339.3 633.4c-1 2.2-3.4 1.2-2.5-.9s13.7-30 14.3-31.4c1.2-3.3 4.2-.9 2.9 1.3-1.9 3.1-12.3 25.7-14.7 31" className="st1"/><path d="M377.3 655.9c.2 2.4-2.4 2.7-2.6.4s-2.5-42.5-2.7-44c-.5-3.5 3.2-2.8 3.2-.2-.1 3.7 1.6 38.1 2.1 43.8" className="st1"/><path d="M408.6 636.6c.9 2.2-1.4 3.3-2.4 1.2s-11.4-29.5-12-30.8c-1.5-3.1 2.2-3.7 2.9-1.2 1.1 3.5 9.3 25.6 11.5 30.8" className="st1"/><path d="M404.5 595.8c1 .9 1 2.5.1 3.5l-.1.1c-1.7 2-11.2 12-21.2 13.6-7.2 1.2-17.2-1.1-24.7-6.5s-14.5-13.7-15.9-24-1.6-15.7-1.3-18 .7-.2 3 2.1 10.7 6.9 14.2 8.1c2.7.9 5.3 1.3 8 7.1s8 15.9 10.2 19.6 5.5 10.7 14.2 5.1 13.5-8.6 13.5-10.7" className="st1"/><path d="M473.8 559.6s10.1-7.5 17.7-10.7 22.6 3.2 22.6 3.2l-7.8 17.7-11.4 5.2s-23.2-10.9-21.1-15.4" className="st2"/><path d="M538.9 597.2c1 2.2 3.4 1.2 2.5-.9s-13.7-30-14.2-31.4c-1.2-3.3-4.2-.9-2.9 1.3 1.8 3.1 12.3 25.7 14.6 31" className="st1"/><path d="M500.9 619.7c-.2 2.4 2.4 2.7 2.7.4s2.5-42.5 2.6-44c.5-3.5-3.2-2.8-3.2-.2.1 3.7-1.6 38.1-2.1 43.8" className="st1"/><path d="M469.6 600.4c-.9 2.2 1.4 3.3 2.4 1.2s11.4-29.5 12-30.8c1.5-3.1-2.2-3.7-3-1.2-1 3.6-9.1 25.6-11.4 30.8" className="st1"/><path d="M473.8 559.6c-1 .9-1 2.5-.1 3.4l.1.1c1.7 2 11.2 12 21.1 13.6 7.2 1.2 17.2-1.1 24.7-6.5s14.5-13.7 15.9-24 1.6-15.7 1.3-18-.7-.2-3 2.1-10.7 6.9-14.2 8.1c-2.7.9-5.3 1.3-8 7.1s-8 15.9-10.2 19.6-5.5 10.7-14.2 5.1-13.4-8.5-13.4-10.6" className="st1"/><path d="M422.8 589.3s10.1-7.5 17.7-10.7 22.6 3.3 22.6 3.3l-7.8 17.7-11.4 5.2c0-.1-23.1-10.9-21.1-15.5" className="st2"/><path d="M487.9 626.9c1 2.2 3.4 1.2 2.5-.9s-13.7-30-14.2-31.4c-1.2-3.2-4.2-.9-2.9 1.3 1.8 3.2 12.3 25.8 14.6 31" className="st1"/><path d="M450 649.4c-.2 2.4 2.4 2.7 2.7.4s2.5-42.5 2.7-44c.5-3.5-3.2-2.8-3.2-.2 0 3.7-1.7 38.1-2.2 43.8" className="st1"/><path d="M418.7 630.2c-.9 2.2 1.4 3.3 2.4 1.2s11.4-29.5 12-30.8c1.5-3.1-2.2-3.7-3-1.2-1.1 3.5-9.2 25.5-11.4 30.8" className="st1"/><path d="M422.8 589.3c-1 .9-1 2.5-.1 3.5l.1.1c1.7 2 11.2 12 21.2 13.6 7.2 1.2 17.2-1.1 24.7-6.5s14.5-13.7 15.9-24 1.6-15.8 1.3-18-.7-.2-3 2.1-10.7 6.9-14.2 8.1c-2.7.9-5.3 1.3-8 7.1s-8 15.9-10.2 19.6-5.4 10.7-14.2 5.1-13.5-8.6-13.5-10.7" className="st1"/><path d="m416.2 592.9-3.3 59.2h-6.7l3.3-59.2z" className="st1"/><path d="m528.7 524.1 23.2 43.9h6.6l-23.2-43.9z" className="st1"/><path d="m558.3 518.1-76.1-44-149 86 76.2 44z" className="st1"/><path d="M409.4 607.9v-3.8l-76.2-44v3.8z" className="st0"/><path d="M409.4 607.9v-3.8l148.9-86v3.8z" className="st2"/><path d="m363.2 566.1-23.2 44h-6.6l23.2-44z" className="st1"/>
            </g>
          </svg>
          <rect x="0" y="0" width="722.7" height="538.2" fill={overlayColor("kitchen")} pointerEvents="none" />
        </g>

        {/* ── Salle de bain ── */}
        <g {...roomProps("showerroom", "Salle de bain")} className="room showerroom" transform="translate(859.1,276.7)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" id="bg-showerroom" width="457.8" height="433" x="0" y="0" version="1.1">
            <style>{`.st0,.st1,.st2,.st3{fill:#97c1db;stroke:#28316d;stroke-linecap:round;stroke-linejoin:round}.st1,.st2,.st3{fill:#fff}.st2,.st3{fill:#cce0ee}.st3{fill:none}.st4{fill:#fff}`}</style>
            <g id="Bathroom" transform="translate(-859.1 -276.7)">
              <path d="M859.6 520v69.2l238.3-137.7 3.3-174.3-241.6 139.6z" className="st0"/><path d="m859.6 588.8 208.5 120.4 248.3-143.3-208.5-120.5z" className="st1"/><path d="m889.4 606 248.3-143.4" className="st3"/><path d="m869.5 594.5 248.3-143.3" className="st3"/><path d="m909.2 617.5 248.3-143.4" className="st3"/><path d="m929.1 628.9 248.3-143.3" className="st3"/><path d="M949 640.4 1197.2 497" className="st3"/><path d="m968.8 651.9 248.3-143.4" className="st3"/><path d="M988.7 663.3 1237 520" className="st3"/><path d="m1008.6 674.8 248.2-143.3" className="st3"/><path d="m1028.4 686.3 248.3-143.4" className="st3"/><path d="m1048.3 697.7 248.3-143.3" className="st3"/><path d="M879.5 577.3 1088 697.7" className="st3"/><path d="m899.3 565.9 208.6 120.4" className="st3"/><path d="m919.2 554.4 208.5 120.4" className="st3"/><path d="m939 542.9 208.6 120.4" className="st3"/><path d="m958.9 531.5 208.6 120.4" className="st3"/><path d="m978.8 520 208.5 120.4" className="st3"/><path d="m998.6 508.5 208.6 120.4" className="st3"/><path d="M1018.5 497 1227 617.5" className="st3"/><path d="M1038.3 485.6 1246.9 606" className="st3"/><path d="m1058.2 474.1 208.6 120.4" className="st3"/><path d="m1078.1 462.6 208.5 120.5" className="st3"/><path d="m1097.9 451.2 208.6 120.4" className="st3"/><path d="m1309.8 569.7-145.7-84.1V313.5l145.5 84.1z" className="st2"/><path d="M1217.1 542.9V401.3" className="st3"/><path d="M1184 562V420.6l62.9-36.7v141.8z" style={{opacity:0.5,fill:"#fff",stroke:"#28316d",strokeLinecap:"round",strokeLinejoin:"round"}}/><path d="M1184 569.7V562l62.9 36.3v7.7z" className="st2"/><path d="m1246.9 606 62.9-36.3V562l-62.9 36.3z" className="st0"/><path d="m1309.8 562-62.9 36.3L1184 562l62.9-36.3z" className="st1"/><path d="m1246.9 560.1 6.6 3.8 6.7-3.8-6.7-3.8z" className="st2"/><g style={{opacity:0.5}}><path d="M1246.9 598.3V456.9l-62.9-36.3V562z" className="st1"/></g><path d="m1278.2 492.3 1.7-1c1.1-.6 2.8.4 3.8 2.2s1.1 3.9 0 4.5l-1.7 1" className="st1"/><ellipse cx="1280.1" cy="495.8" className="st1" rx="2.2" ry="3.9" transform="rotate(-28.972 1279.974 495.735)"/><path d="M1272.7 423.2v-8.6h-.1l-11.6 6.7c-.4.2-1.1-.1-1.5-.9s-.4-1.5 0-1.8l11.6-6.7c.9-.5 4.7-1.1 4.7 2.6v81.9h.1l3-1.7c.4-.2 1.1.1 1.5.9s.4 1.5 0 1.8l-3 1.7c-.9.5-4.7 1.1-4.7-2.5z" className="st1"/><ellipse cx="1260.6" cy="426.9" className="st1" rx="13.2" ry="7.7"/><ellipse cx="1260.6" cy="425" className="st1" rx="13.2" ry="7.7"/><ellipse cx="1260.6" cy="422.2" className="st1" rx="4.6" ry="2.7"/><ellipse cx="1260.6" cy="421.2" className="st1" rx="4.6" ry="2.7"/><path d="m1267 414.3-7.6 4.4v2.7h1.5l7.9-4.6" className="st1"/><path d="M1147.6 495.1v-172l-62.9-36.3v172z" className="st2"/><path d="M1147.6 495.1v-172l16.5-9.6v172.1z" className="st0"/><path d="m1094.6 475.8 3.3-13.3 19.9 4v11.3l-5.8 3.3s-4 2.3-7.4.4c-1.9-1-10-5.7-10-5.7" className="st1"/><path d="M1075.5 464.1c1.5 2.7 12.8 13.7 20.3 12.7s18.4-8.3 22-10.3c2.2-1.2 6.6-4 6.6-11.6" className="st1"/><path d="m1091.3 443.5-13.2 7.6c-4.2 2.5-5.7 7.9-3.2 12.1.8 1.3 1.9 2.5 3.2 3.2v0c8.2 4.7 18.2 4.7 26.3 0l21.6-12.5v-3.8" className="st1"/><path d="m1091.3 439.7-13.2 7.6c-4.2 2.5-5.7 7.9-3.2 12.1.8 1.3 1.9 2.5 3.2 3.2v0c8.2 4.7 18.2 4.7 26.3 0l13.3-7.7z" className="st1"/><path d="m1118 423.5-.2 31.5-26.5-15.2v-31.7z" className="st1"/><path d="m1126.8 417.7-9 4.8V455l8.3-4.8z" className="st2"/><path d="M1092.7 409.9c-1.4-.8-1.4-2.2 0-3l5.2-3c1.6-.8 3.6-.8 5.2 0l22.4 13c1.4.8 1.4 2.2 0 3l-5 3c-1.6.8-3.5.8-5.2 0z" className="st4"/><path d="M1092.7 409.9c-1.4-.8-1.4-2.2 0-3l5.2-3c1.6-.8 3.6-.8 5.2 0l22.4 13c1.4.8 1.4 2.2 0 3l-5 3c-1.6.8-3.5.8-5.2 0z" className="st3"/><ellipse cx="1106.8" cy="365.5" className="st1" rx="9.8" ry="17" transform="rotate(-88.97 1106.826 365.528)"/><path d="M1129.4 320.7v38.7c.1 7.2-9.9 13-22.4 12.9s-22.7-6-22.9-13.2v-38.7" className="st1"/><ellipse cx="1106.8" cy="320.6" className="st1" rx="13.1" ry="22.6" transform="rotate(-88.97 1106.823 320.61)"/><path d="m1309.8 569.7 6.6-3.8-.2-172.1-6.6 3.8z" className="st0"/><path d="m1092.3 645.4 62.9-36.3 35.2 20.3-62.9 36.3z" className="st0"/><path d="m1092.3 596.9 62.9-36.3 35.2 20.3-62.9 36.3z" className="st0"/><path d="m1092.3 585.8 62.9-36.3 35.2 20.3-62.9 36.3z" className="st1"/><path d="m1094.6 655.7 62.9-36.3 32.5 18.7-62.9 36.3z" fill="#28316d"/><path d="M1127.5 617.2v-11.1l62.9-36.3v11.1z" className="st0"/><path d="m1127.5 617.2-35.2-20.3v-11.1l35.2 20.3z" className="st2"/><path d="m1127.5 665.7-35.2-20.3v-48.5l3.1 1.9 32.1 18.4z" className="st2"/><path d="m1092.3 622.9 2.9 1.7" className="st3"/><path d="M1127.5 665.7v-48.5l62.9-36.3v48.5z" className="st0"/><path d="m1095.2 624.6.2-25.8" className="st3"/><path d="m1095.1 647 .1-22.4" className="st3"/><path d="m1098.7 585.7 56.4-32.5 21.9 12.6-56.3 32.6z" className="st2"/><path d="m1109.1 588.4 36.1-20.9" className="st3"/><path d="m1165.5 572.5-44.8 25.9" className="st3"/><path d="M1155.1 553.2c0 4.8-1 9-9.8 14.3" className="st0"/><path d="M1104 588.8c1.8.6 3.8.3 6.3-1.1" className="st0"/><path d="m1157.6 582.4 3-1.8c.6-.4.6-1.5 0-2.6s-1.6-1.6-2.2-1.3l-3 1.7" className="st1"/><ellipse cx="1156.5" cy="580.5" className="st1" rx="1.3" ry="2.2" transform="rotate(-28.972 1156.402 580.417)"/><path d="M1152.6 578.4v7.4c0 .6.8 1.1 1.9 1.1s2-.5 2-1.1v-7.4" className="st1"/><path d="m1150.9 586.2 3-1.8c.6-.4.6-1.5 0-2.6s-1.6-1.6-2.2-1.3l-3 1.7" className="st1"/><ellipse cx="1149.9" cy="584.3" className="st1" rx="1.3" ry="2.2" transform="rotate(-28.972 1149.724 584.208)"/><path d="m1156.5 578.7-7.2-4.1c-1.1-.5-2.3-.5-3.4 0-.9.5-.9 1.4.1 2l6.6 3.8" className="st4"/><path d="m1156.5 578.7-7.2-4.1c-1.1-.5-2.3-.5-3.4 0-.9.5-.9 1.4.1 2l6.6 3.8" className="st3"/><path d="M1145.9 572.5c-.9.5-.9 1.4.1 1.9l6.5 3.7c1.1.5 2.3.5 3.4 0 .9-.5.9-1.4-.1-1.9l-6.5-3.7c-1-.5-2.3-.5-3.4 0" className="st4"/><path d="M1145.9 572.5c-.9.5-.9 1.4.1 1.9l6.5 3.7c1.1.5 2.3.5 3.4 0 .9-.5.9-1.4-.1-1.9l-6.5-3.7c-1-.5-2.3-.5-3.4 0" className="st3"/><path d="M1145.2 575.4V574" className="st3"/><path d="M1156.5 577.3v1.9" className="st3"/><path d="M968.8 525.7v-68.8l39.8 23v68.8z" className="st2"/><path d="M1048.3 525.7v-61.1l-39.7 22.9v61.2z" className="st0"/><path d="m1032.9 485.2 2.3.5c6.3 1.6 9.1 11.7 6.1 22.7-3 10.9-10.6 18.5-16.9 16.9l-2.3-.5" className="st1"/><ellipse cx="1027.6" cy="505.1" className="st2" rx="20.5" ry="11.8" transform="rotate(-73.972 1027.548 505.076)"/><path d="M1048.3 456.9v7.7l-39.7 22.9v-7.6z" className="st0"/><path d="m1014.7 482.9-1.2-.3c-.8-.2-1.1-1.4-.7-2.7s1.3-2.2 2-2l1.2.3" className="st1"/><ellipse cx="1015.4" cy="480.5" className="st1" rx="2.5" ry="1.4" transform="rotate(-73.972 1015.393 480.568)"/><path d="m1019.8 479.9-1.2-.3c-.8-.2-1.1-1.4-.7-2.7s1.3-2.2 2-2l1.2.3" className="st1"/><ellipse cx="1020.5" cy="477.6" className="st1" rx="2.5" ry="1.4" transform="rotate(-73.972 1020.472 477.58)"/><path d="m1041.7 468.4-6.7 3.8v-3.8l6.7-3.8z" className="st0"/><path d="m1048.3 456.9-39.7 23-39.8-23 39.7-22.9z" className="st1"/>
            </g>
          </svg>
          <rect x="0" y="0" width="457.8" height="433" fill={overlayColor("showerroom")} pointerEvents="none" />
        </g>

        {/* ── Salon ── */}
        <g {...roomProps("livingroom", "Salon")} className="room livingroom" transform="translate(425.40,532.8)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" id="bg-livingroom" width="643.2" height="371.9" x="0" y="0" version="1.1">
            <style>{`.st0,.st1,.st2,.st3{fill:#97c1db;stroke:#28316d;stroke-linecap:round;stroke-linejoin:round}.st1,.st2,.st3{fill:#fff}.st2,.st3{fill:#cce0ee}.st3{fill:none}.st4{fill:#fff}.st7,.st9{fill:#28316d;stroke:#cce0ee;stroke-linecap:round;stroke-linejoin:round}.st9{fill:none}.st10{fill:#97c1db}`}</style>
            <g id="Living_Room" transform="translate(-425.4 -532.8)">
              <path d="m425.9 728.3 337.7-195 304.5 175.9-337.6 195z" className="st1"/><path d="m439.2 736 337.6-195" className="st9"/><path d="m452.4 743.6 337.7-194.9" className="st9"/><path d="m465.6 751.3 337.7-195" className="st9"/><path d="m478.9 758.9 337.6-195" className="st9"/><path d="m492.1 766.5 337.7-194.9" className="st9"/><path d="m505.4 774.2 337.6-195" className="st9"/><path d="m518.6 781.8 337.7-194.9" className="st9"/><path d="m531.9 789.5 337.6-195" className="st9"/><path d="m545.1 797.1 337.7-194.9" className="st9"/><path d="m558.3 804.8 337.7-195" className="st9"/><path d="m571.6 812.4 337.6-194.9" className="st9"/><path d="m584.8 820.1 337.7-195" className="st9"/><path d="m598.1 827.7 337.6-194.9" className="st9"/><path d="m611.3 835.4 337.7-195" className="st9"/><path d="m624.5 843 337.7-195" className="st9"/><path d="m637.8 850.7 337.7-195" className="st9"/><path d="m651 858.3 337.7-195" className="st9"/><path d="m664.3 866 337.6-195" className="st9"/><path d="m677.5 873.6 337.7-195" className="st9"/><path d="m690.8 881.2 337.6-194.9" className="st9"/><path d="m704 888.9 337.7-195" className="st9"/><path d="m717.2 896.5 337.7-194.9" className="st9"/><path d="M841 809.4v22.9l3.3-1.9v-22.9z" className="st0"/><path d="m841 832.3-3.3-1.9v-22.9l3.3 1.9z" className="st2"/><path d="M809.6 791.4v22.9l3.3-1.9v-22.9z" className="st0"/><path d="m809.6 814.3-3.3-1.9v-22.9l3.3 1.9z" className="st2"/><path d="M963.5 739.8v22.9l3.3-1.9v-22.9z" className="st0"/><path d="m963.5 762.7-3.3-1.9v-22.9l3.3 1.9z" className="st2"/><path d="M803.3 770.4v34.4l39.7 22.9v-34.4z" className="st2"/><path d="M968.8 720.7v34.4L843 827.7v-34.4z" className="st0"/><path d="m803.3 770.4 125.8-72.6 39.7 22.9L843 793.3z" className="st1"/><path d="M862.9 762.7v-53.5l-3.3-1.9v53.5z" className="st2"/><path d="M862.9 762.7v-53.5l72.8-42.1.1 53.6z" className="st0"/><path d="m935.7 667.1-72.8 42.1-3.3-1.9 72.8-42.1z" className="st1"/><path d="m922.5 743.6-29.8 17.2-10-5.7 29.8-17.2z" className="st1"/><path d="M922.5 742.8 892.7 760l-10-5.7 29.8-17.2z" className="st1"/><path d="M896 756v-35.3l-3.3-1.9v35.3z" className="st2"/><path d="M896 756v-35.3l16.5-9.6.1 35.4z" className="st0"/><path d="m912.5 711.1-16.5 9.6-3.3-1.9 16.6-9.6z" className="st1"/><path d="M1008.6 671v-57.4L949 579.2v57.4z" className="st2"/><path d="m1015.2 609.8-59.6-34.4-6.6 3.8 59.6 34.4z" className="st1"/><path d="m1008.6 671 6.6-3.8v-57.4l-6.6 3.8z" className="st2"/><path d="M958.9 585v57.3" className="st3"/><path d="M968.8 590.7V648" className="st3"/><path d="M978.8 596.4v57.4" className="st3"/><path d="M988.7 602.2v57.3" className="st3"/><path d="M998.6 607.9v57.3" className="st3"/><path d="M753.7 758v-22.9l-3.4 1.9v22.9z" className="st0"/><path d="m747 735.1 3.3 1.9v22.9L747 758z" className="st2"/><path d="M713.9 735.1v-23l-3.3 1.9v23z" className="st0"/><path d="m707.3 712.1 3.3 1.9v23l-3.3-1.9z" className="st2"/><path d="M846.3 704.4v-22.9l-3.3 1.9v22.9z" className="st0"/><path d="m839.7 681.5 3.3 1.9v22.9l-3.3-1.9z" className="st2"/><path d="m700.7 716 49.6 28.6v3.9l-49.6-28.7z" className="st2"/><path d="m700.7 716 102.6-59.3 49.7 28.7-102.7 59.2z" className="st1"/><path d="M853 685.4v3.8l-102.7 59.3v-3.9z" className="st0"/>
            </g>
          </svg>
          <rect x="0" y="0" width="643.2" height="371.9" fill={overlayColor("livingroom")} pointerEvents="none" />
        </g>

        {/* ── Contour du bâtiment (top layer) ── */}
        <g transform="translate(130.8,91.3)" style={{ pointerEvents: "none" }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1185.9" height="471.2" x="0" y="0" version="1.1">
            <g id="Top_Building" transform="translate(-130.8 -91.3)">
              <path d="m864.9 413.7-5.3 3.1-6.6-3.8" fill="#fff" stroke="#28316d" strokeLinecap="round" strokeLinejoin="round"/><path d="M793.3 91.8 551.8 231.2l-76.2-43.8-344.3 198.8 6.6 3.8 337.7-195 384 221.7 208.5 120.4 6.6-3.8-209.8-119.6 219.8-126.9 62.9 36.3 16.6-9.5 145.4 84 6.6-3.8zm66.3 317.4-301.3-174L793.4 99.5l301.2 174z" fill="#fff" stroke="#28316d" strokeLinecap="round" strokeLinejoin="round"/><path d="m137.9 390-6.6-3.8v172l6.6 3.8z" fill="#cce0ee" stroke="#28316d" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </g>

        {/* ── Masques de pièces (blancs = inactif, cachés = actif) ── */}
        <g transform="translate(130.780,186.893)" className="room-mask bedroom-mask" style={{ pointerEvents: "none", opacity: maskHidden("bedroom") ? 0 : 0.8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1186.12" height="717.924">
            <path d="M.5 199.377 344.78.577l76.23 43.8 307.78 177.94 241.552-139.62 215.078 124.21.2 172.11-585.94 338.33-304.6-175.86L.5 371.387z" fill="#fff" stroke="#28316d" strokeWidth="1"/>
          </svg>
        </g>

        <g transform="translate(424.860,91.253)" className="room-mask kitchen-mask" style={{ pointerEvents: "none", opacity: maskHidden("kitchen") ? 0 : 0.8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="892.041" height="813.565">
            <path d="m368.46.577-241.53 139.44L338.61 262.47l.08 179.678-51.65 29.752-4.7-2.252-1.3-3-1.3-1.4-.86-2.07-3.74-1.43-3.021.218-3.311-.44-4.41-2.488-1.828-11.16-9.93-5.73-123.596 71.382s.07-8.736.07-16.945c0-11.981-19.464-16.995-30.798-16.873-11.543.125-29.19 5.598-29.19 17.951l.264 31.485s.184 12.75 22.432 15.869c-.896 6.352-6.145 43.146-6.145 43.146L1 637.128l304.602 175.86 585.94-338.33-.202-172.11Zm-241.67 534.17c-.024 2.196.094 4.02.104 5.414-.7-.4-2.488-.992-3.178-.627-1.327.704-6.493 3.685-8.275 4.713s-1.701 4.9-1.701 4.9l-.084 22.872-1.28.738-5.836-27.848c9.19-2.003 13.807-3.547 20.25-10.162zm-24.38 10.559 6.72 29.53-13.82 7.777 3.06-37.145z" fill="#fff" stroke="#28316d" strokeWidth="1"/>
          </svg>
        </g>

        <g transform="translate(130.800,91.223)" className="room-mask livingroom-mask" style={{ pointerEvents: "none", opacity: maskHidden("livingroom") ? 0 : 0.8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1186.1" height="637.736">
            <path d="M421 139.977 662.5.577l522.9 302 .2 172.1-248.3 143.3v-172L632.67 270.5l.08 171.678-51.65 29.752-4.7-2.252-1.3-3-1.3-1.4-.86-2.069-3.74-1.432-3.021.22-3.311-.44-4.41-2.489-1.828-11.16-9.93-5.73-123.596 71.383s.07-8.737.07-16.946c0-11.98-19.464-16.995-30.798-16.873-11.543.125-29.19 5.598-29.19 17.951l.264 31.485s.184 12.75 22.432 15.869c-.896 6.352-6.145 43.146-6.145 43.146l-84.678 48.965L.5 466.978v-172l344.3-198.8Zm-.15 394.8c-.024 2.196.094 4.02.104 5.414-.7-.4-2.488-.992-3.178-.627-1.327.704-6.493 3.685-8.275 4.713s-1.701 4.9-1.701 4.9l-.084 22.872-1.28.738-5.836-27.848c9.19-2.003 13.807-3.547 20.25-10.162zm-24.38 10.559 6.72 29.53-13.82 7.777 3.06-37.145z" fill="#fff" stroke="#28316d" strokeWidth="1"/>
          </svg>
        </g>

        <g transform="translate(130.780,91.194)" className="room-mask showerroom-mask" style={{ pointerEvents: "none", opacity: maskHidden("showerroom") ? 0 : 0.8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="978.05" height="813.623">
            <path d="m.5 295.076 344.28-198.8 76.23 43.8L662.438.577 977.05 182.27 735.308 321.777l208.55 120.38.102 172.09-344.28 198.8-304.6-175.86L.5 467.086z" fill="#fff" stroke="#28316d" strokeWidth="1"/>
          </svg>
        </g>

      </svg>
    </div>
  );
}
