"use client";

import type { Piece } from "@/types/materiel";

interface Props {
  piece: Exclude<Piece, "Tous">;
}

/* ─── shared helpers ─── */
const Wall   = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 800 480" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {children}
  </svg>
);

/* ══════════════════════════════════════════════════
   CUISINE
══════════════════════════════════════════════════ */
function CuisineSVG() {
  return (
    <>
      {/* Mur fond */}
      <rect width="800" height="480" fill="#FAF7F2"/>
      <rect width="800" height="8"   fill="#EDE8DF"/>

      {/* Parquet sol */}
      <rect x="0" y="370" width="800" height="110" fill="#C8956C"/>
      {[0,14,28,42,56,70,84,98].map(i=><line key={i} x1="0" y1={372+i} x2="800" y2={372+i} stroke="#B0784A" strokeWidth="0.6" opacity="0.4"/>)}
      {[0,133,266,400,533,666].map(i=><line key={i} x1={i} y1="370" x2={i} y2="480" stroke="#B0784A" strokeWidth="1" opacity="0.35"/>)}
      <rect x="0" y="368" width="800" height="3" fill="#A06840"/>

      {/* Plan de travail */}
      <rect x="30"  y="235" width="560" height="28" fill="#D5D0C8"/>
      <rect x="30"  y="235" width="560" height="7"  fill="#E5E0D8"/>
      <rect x="30"  y="260" width="560" height="4"  fill="#C0BBB2"/>

      {/* Meubles bas gauche (sous évier) */}
      <rect x="32"  y="264" width="198" height="106" fill="#EDE9E2" rx="2"/>
      <line x1="131" y1="264" x2="131" y2="370" stroke="#D8D3CB" strokeWidth="1.5"/>
      <rect x="72"  y="310" width="50"  height="6" rx="3" fill="#C5C0B8"/>
      <rect x="143" y="310" width="50"  height="6" rx="3" fill="#C5C0B8"/>

      {/* Meubles bas centre (sous plaques) */}
      <rect x="240" y="264" width="198" height="106" fill="#EDE9E2" rx="2"/>
      <line x1="339" y1="264" x2="339" y2="370" stroke="#D8D3CB" strokeWidth="1.5"/>
      <rect x="278" y="310" width="50"  height="6" rx="3" fill="#C5C0B8"/>
      <rect x="351" y="310" width="50"  height="6" rx="3" fill="#C5C0B8"/>

      {/* Meubles bas droite */}
      <rect x="448" y="264" width="140" height="106" fill="#EDE9E2" rx="2"/>
      <rect x="494" y="310" width="50"  height="6" rx="3" fill="#C5C0B8"/>

      {/* Meubles hauts gauche */}
      <rect x="32"  y="42"  width="180" height="155" fill="#F0ECE5" rx="3"/>
      <line x1="122" y1="42" x2="122" y2="197" stroke="#E0DBD3" strokeWidth="1.5"/>
      <rect x="68"  y="115" width="45"  height="5" rx="2.5" fill="#C8C3BB"/>
      <rect x="133" y="115" width="45"  height="5" rx="2.5" fill="#C8C3BB"/>

      {/* Hotte aspirante */}
      <rect x="235" y="42"  width="178" height="28"  fill="#9A9A9A" rx="3"/>
      <rect x="248" y="70"  width="152" height="20"  fill="#888" rx="2"/>
      <rect x="248" y="92"  width="152" height="8"   fill="#808080"/>
      {/* Lumières hotte */}
      <circle cx="278" cy="78" r="5" fill="#FFE080" opacity="0.9"/>
      <circle cx="358" cy="78" r="5" fill="#FFE080" opacity="0.9"/>
      <circle cx="388" cy="78" r="5" fill="#FFE080" opacity="0.9"/>

      {/* Meubles hauts droite */}
      <rect x="430" y="42"  width="158" height="155" fill="#F0ECE5" rx="3"/>
      <line x1="509" y1="42" x2="509" y2="197" stroke="#E0DBD3" strokeWidth="1.5"/>
      <rect x="447" y="115" width="45"  height="5" rx="2.5" fill="#C8C3BB"/>
      <rect x="518" y="115" width="45"  height="5" rx="2.5" fill="#C8C3BB"/>

      {/* Plaques de cuisson */}
      <rect x="240" y="222" width="198" height="30" fill="#232323" rx="2"/>
      <circle cx="292" cy="237" r="15" fill="none" stroke="#555" strokeWidth="2.5"/>
      <circle cx="292" cy="237" r="8"  fill="none" stroke="#555" strokeWidth="1.5"/>
      <circle cx="360" cy="237" r="19" fill="none" stroke="#555" strokeWidth="2.5"/>
      <circle cx="360" cy="237" r="10" fill="none" stroke="#555" strokeWidth="1.5"/>
      <circle cx="413" cy="237" r="13" fill="none" stroke="#555" strokeWidth="2"/>

      {/* Évier */}
      <rect x="50"  y="222" width="145" height="28" fill="#B5CCCC" rx="2"/>
      <rect x="60"  y="225" width="125" height="22" fill="#9EBABA" rx="1"/>
      <rect x="110" y="207" width="8"   height="20" fill="#C0C0C0" rx="3"/>
      <ellipse cx="114" cy="207" rx="14" ry="5" fill="#C0C0C0"/>

      {/* Réfrigérateur */}
      <rect x="603" y="42"  width="145" height="328" fill="#F5F5F5" rx="4"/>
      <rect x="603" y="42"  width="145" height="165" fill="#F8F8F8" rx="4"/>
      <line x1="603" y1="207" x2="748" y2="207" stroke="#DDD" strokeWidth="2"/>
      <rect x="611" y="120" width="9"   height="55" rx="4" fill="#D0D0D0"/>
      <rect x="611" y="260" width="9"   height="55" rx="4" fill="#D0D0D0"/>
      <rect x="628" y="60"  width="80"  height="38" rx="2" fill="#E8F0F0"/>

      {/* Chaudière */}
      <rect x="756" y="80"  width="38"  height="72"  fill="#CDD8E0" rx="5"/>
      <circle cx="775" cy="106" r="14" fill="#B0C4D0"/>
      <circle cx="775" cy="106" r="7"  fill="#90A8B8"/>
      <rect x="765" y="140" width="20" height="7"  rx="3" fill="#809090"/>
      <rect x="758" y="152" width="36" height="4"  rx="2" fill="#A0B0B8"/>
      <line x1="775" y1="152" x2="775" y2="370" stroke="#A0B0B8" strokeWidth="3" strokeDasharray="4 3"/>
    </>
  );
}

/* ══════════════════════════════════════════════════
   SALLE DE BAIN
══════════════════════════════════════════════════ */
function SalleDeBainSVG() {
  const tileW = 50;
  const tileH = 50;
  return (
    <>
      {/* Fond mur carrelé */}
      <rect width="800" height="480" fill="#EBF3F5"/>
      {/* Grille carrelage mur */}
      {Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 17 }, (_, col) => (
          <rect key={`tw-${row}-${col}`}
            x={col * tileW} y={row * tileH}
            width={tileW - 1} height={tileH - 1}
            fill={row % 2 === col % 2 ? "#E2EEF1" : "#EBF3F5"}
            opacity="0.7"
          />
        ))
      )}
      {/* Lignes de joint mur */}
      {Array.from({ length: 11 }, (_, i) => <line key={`mh-${i}`} x1="0" x2="800" y1={i*tileH} y2={i*tileH} stroke="#D0E4E8" strokeWidth="1.5"/>)}
      {Array.from({ length: 17 }, (_, i) => <line key={`mv-${i}`} x1={i*tileW} x2={i*tileW} y1="0" y2="480" stroke="#D0E4E8" strokeWidth="1.5"/>)}

      {/* Sol carrelage gris */}
      <rect x="0" y="380" width="800" height="100" fill="#CBD8DB"/>
      {Array.from({ length: 5 }, (_, col) =>
        Array.from({ length: 2 }, (_, row) => (
          <rect key={`ts-${row}-${col}`}
            x={col * 160} y={380 + row * 50}
            width="158" height="48"
            fill={row % 2 === col % 2 ? "#C0CDD0" : "#CBD8DB"}
          />
        ))
      )}
      <rect x="0" y="378" width="800" height="3" fill="#A8B8BC"/>

      {/* Plinthe */}
      <rect x="0" y="374" width="800" height="8" fill="#B8C8CC"/>

      {/* VMC (ventilation plafond) */}
      <rect x="370" y="4"  width="60" height="18" fill="#C8D8DC" rx="3"/>
      <line x1="380" y1="10" x2="420" y2="10" stroke="#A0B0B4" strokeWidth="1"/>
      <line x1="380" y1="14" x2="420" y2="14" stroke="#A0B0B4" strokeWidth="1"/>
      <line x1="380" y1="18" x2="420" y2="18" stroke="#A0B0B4" strokeWidth="1"/>

      {/* Baignoire */}
      <rect x="30"  y="270" width="260" height="110" fill="#F8FAFA" rx="8"/>
      <rect x="40"  y="280" width="240" height="90"  fill="#EFF6F8" rx="6"/>
      <rect x="50"  y="290" width="220" height="70"  fill="#E5F0F5" rx="4"/>
      {/* Robinet baignoire */}
      <rect x="128" y="262" width="8"   height="14" fill="#C0C0C0" rx="3"/>
      <ellipse cx="132" cy="262" rx="12" ry="4" fill="#C0C0C0"/>

      {/* Douche (séparateur) */}
      <rect x="290" y="220" width="4"   height="162" fill="#B8D0D4" opacity="0.7"/>

      {/* WC */}
      <rect x="320" y="290" width="110" height="88"  fill="#F5F8F8" rx="6"/>
      <rect x="325" y="280" width="100" height="30"  fill="#EEF2F2" rx="4"/>
      <ellipse cx="375" cy="337" rx="42" ry="28" fill="#EBF0F0" stroke="#D8E0E0" strokeWidth="1.5"/>
      <rect x="340" y="280" width="70"  height="10"  fill="#E0E8E8" rx="3"/>

      {/* Lavabo / meuble vasque */}
      <rect x="490" y="270" width="160" height="30"  fill="#D8E8EC" rx="3"/> {/* plan vasque */}
      <rect x="490" y="300" width="160" height="78"  fill="#E8F0F2" rx="2"/> {/* meuble bas */}
      <ellipse cx="570" cy="278" rx="60" ry="20" fill="#EFF6F8" stroke="#C0D8DC" strokeWidth="2"/>
      <ellipse cx="570" cy="278" rx="45" ry="14" fill="#E5F0F5"/>
      {/* Robinet lavabo */}
      <rect x="566" y="252" width="8"   height="18" fill="#C0C0C0" rx="3"/>
      <ellipse cx="570" cy="252" rx="12" ry="4" fill="#C0C0C0"/>

      {/* Miroir au-dessus du lavabo */}
      <rect x="494" y="80"  width="152" height="165" fill="#D8EEF4" rx="4"/>
      <rect x="498" y="84"  width="144" height="157" fill="#C8E4EC" rx="3"/>
      {/* Reflet miroir */}
      <line x1="510" y1="90" x2="528" y2="90" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
      <line x1="510" y1="98" x2="520" y2="98" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <rect x="500" y="242" width="148" height="6" rx="2" fill="#A8C8D0"/>

      {/* Chauffe-eau */}
      <ellipse cx="80" cy="120" rx="45" ry="60" fill="#D0DCE4"/>
      <ellipse cx="80" cy="120" rx="38" ry="53" fill="#C0CCD8"/>
      <rect x="64"  y="165" width="32" height="10" rx="3" fill="#9AAAB8"/>
      <rect x="72"  y="175" width="16" height="6"  rx="2" fill="#8090A0"/>
      <line x1="80" y1="181" x2="80" y2="370" stroke="#9AAAB8" strokeWidth="3" strokeDasharray="4 3"/>
      <rect x="60"  y="60"  width="40" height="10" rx="3" fill="#A0B0C0"/>
      <circle cx="80" cy="90" r="8" fill="#8090A0"/>

      {/* Abattant WC */}
      <rect x="338" y="277" width="74"  height="6" rx="3" fill="#D8E4E4"/>
    </>
  );
}

/* ══════════════════════════════════════════════════
   SALLE DE SÉJOUR
══════════════════════════════════════════════════ */
function SalleDeSejourSVG() {
  return (
    <>
      {/* Mur fond */}
      <rect width="800" height="480" fill="#F7F4EF"/>
      {/* Liseré plafond */}
      <rect width="800" height="10"  fill="#EAE5DC"/>
      {/* Moulure plafond */}
      <rect x="0" y="10" width="800" height="5" fill="#F0ECE4"/>

      {/* Parquet sol */}
      <rect x="0"   y="375" width="800" height="105" fill="#C4905E"/>
      {[0,16,32,48,64,80,96].map(i=><line key={i} x1="0" y1={377+i} x2="800" y2={377+i} stroke="#A87040" strokeWidth="0.7" opacity="0.4"/>)}
      {[0,200,400,600].map(i=><line key={i} x1={i} y1="375" x2={i} y2="480" stroke="#A87040" strokeWidth="1" opacity="0.3"/>)}
      <rect x="0"   y="373" width="800" height="4" fill="#9A6838"/>

      {/* Plinthe */}
      <rect x="0" y="368" width="800" height="8" fill="#DDD8CE"/>

      {/* Porte droite */}
      <rect x="680" y="60"  width="100" height="315" fill="#E8E2D8" rx="2"/>
      <rect x="685" y="65"  width="90"  height="305" fill="#DDD6CA"/>
      {/* Vitrages porte */}
      <rect x="692" y="75"  width="75"  height="120" fill="#EAF0F8" rx="2"/>
      <rect x="692" y="205" width="75"  height="130" fill="#EAF0F8" rx="2"/>
      {/* Serrure porte */}
      <circle cx="688" cy="222" r="6" fill="#C0B090"/>
      <rect x="686" y="230" width="4" height="14" rx="2" fill="#C0B090"/>

      {/* Volets / fenêtre */}
      <rect x="150" y="45"  width="200" height="220" fill="#DDD5C8" rx="3"/>
      <rect x="155" y="50"  width="90"  height="210" fill="#C8C0B0" rx="2"/>
      <rect x="255" y="50"  width="90"  height="210" fill="#C8C0B0" rx="2"/>
      {/* Lattes volets */}
      {Array.from({length:14},(_,i)=>(
        <line key={i} x1="155" x2="245" y1={55+i*15} y2={55+i*15} stroke="#B8B0A0" strokeWidth="1.5"/>
      ))}
      {Array.from({length:14},(_,i)=>(
        <line key={i} x1="255" x2="345" y1={55+i*15} y2={55+i*15} stroke="#B8B0A0" strokeWidth="1.5"/>
      ))}
      <rect x="245" y="45" width="10" height="220" fill="#B8B0A0"/>

      {/* Radiateur */}
      <rect x="32"  y="290" width="90"  height="78" fill="#E0DCD4" rx="3"/>
      {[55,70,85,100,115].map(x=>(
        <rect key={x} x={x} y="290" width="8" height="78" rx="2" fill="#D0CCC4"/>
      ))}
      <rect x="32"  y="290" width="90"  height="8" rx="2" fill="#D8D4CC"/>
      <rect x="32"  y="360" width="90"  height="8" rx="2" fill="#D8D4CC"/>

      {/* Tableau électrique */}
      <rect x="32"  y="150" width="55"  height="80" fill="#D8D5D0" rx="4"/>
      <rect x="37"  y="155" width="45"  height="70" fill="#CCCAC4" rx="3"/>
      {[170,185,200,210].map(y=>(
        <rect key={y} x="42" y={y} width="35" height="6" rx="2" fill="#B8B6B0"/>
      ))}
      <rect x="55"  y="157" width="12" height="5" rx="2" fill="#8890A0"/>

      {/* Détecteur de fumée (plafond) */}
      <circle cx="580" cy="12" r="14" fill="#E8E5E0"/>
      <circle cx="580" cy="12" r="9"  fill="#D8D5D0"/>
      <circle cx="580" cy="12" r="4"  fill="#C8C5C0"/>

      {/* Canapé */}
      <rect x="380" y="300" width="260" height="75" fill="#8B7355" rx="6"/>
      <rect x="380" y="280" width="260" height="30" fill="#9A8060" rx="4"/> {/* dossier */}
      <rect x="380" y="295" width="260" height="18" fill="#7A6348" rx="3"/> {/* assise ombre */}
      {/* Coussins */}
      <rect x="393" y="283" width="70"  height="22" fill="#7A6045" rx="3"/>
      <rect x="473" y="283" width="70"  height="22" fill="#7A6045" rx="3"/>
      <rect x="553" y="283" width="70"  height="22" fill="#7A6045" rx="3"/>
      {/* Pieds canapé */}
      <rect x="388" y="370" width="12"  height="8" rx="2" fill="#6A5035"/>
      <rect x="626" y="370" width="12"  height="8" rx="2" fill="#6A5035"/>

      {/* Table basse */}
      <rect x="415" y="368" width="185" height="10" fill="#C0A880" rx="2"/>
      <rect x="430" y="372" width="5"   height="4"  fill="#A89060"/>
      <rect x="590" y="372" width="5"   height="4"  fill="#A89060"/>

      {/* Prises électriques (bas mur gauche) */}
      <rect x="130" y="352" width="22"  height="18" fill="#E0DDD8" rx="2"/>
      <circle cx="136" cy="361" r="3" fill="#C8C5C0"/>
      <circle cx="146" cy="361" r="3" fill="#C8C5C0"/>

      {/* Machine à laver (mur droit, caché partiellement) */}
      <rect x="580" y="230" width="85"  height="145" fill="#F0EFED" rx="4"/>
      <circle cx="622" cy="295" r="30" fill="#E0E8F0"/>
      <circle cx="622" cy="295" r="24" fill="#D0E0EC"/>
      <circle cx="622" cy="295" r="14" fill="#C0D8EC"/>
      <rect x="596" y="238" width="50"  height="12" fill="#E0DEDD" rx="2"/>
      <circle cx="608" cy="244" r="4"  fill="#C0C0C0"/>
      <circle cx="622" cy="244" r="3"  fill="#D0C0A0"/>
      <circle cx="636" cy="244" r="3"  fill="#C0D0C0"/>

      {/* Sèche-linge (à côté) */}
      <rect x="580" y="100" width="85"  height="125" fill="#F0EFED" rx="4"/>
      <circle cx="622" cy="165" r="30" fill="#E8E4E0"/>
      <circle cx="622" cy="165" r="24" fill="#E0DCD8"/>
      <circle cx="622" cy="165" r="14" fill="#D8D4D0"/>
      <rect x="596" y="108" width="50"  height="12" fill="#E0DEDD" rx="2"/>
    </>
  );
}

/* ══════════════════════════════════════════════════
   EXTÉRIEUR
══════════════════════════════════════════════════ */
function ExterieurSVG() {
  return (
    <>
      {/* Ciel */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#87CEEB"/>
          <stop offset="100%" stopColor="#C8E8F5"/>
        </linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7BC67E"/>
          <stop offset="100%" stopColor="#5AA55E"/>
        </linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#sky)"/>

      {/* Nuages */}
      <ellipse cx="150" cy="60"  rx="70" ry="28" fill="white" opacity="0.85"/>
      <ellipse cx="110" cy="65"  rx="40" ry="22" fill="white" opacity="0.85"/>
      <ellipse cx="185" cy="68"  rx="45" ry="20" fill="white" opacity="0.85"/>
      <ellipse cx="600" cy="45"  rx="55" ry="22" fill="white" opacity="0.8"/>
      <ellipse cx="560" cy="50"  rx="35" ry="18" fill="white" opacity="0.8"/>
      <ellipse cx="630" cy="50"  rx="38" ry="16" fill="white" opacity="0.8"/>

      {/* Gazon */}
      <rect x="0"   y="320" width="800" height="160" fill="url(#grass)"/>
      <ellipse cx="400" cy="320" rx="420" ry="18" fill="#6BB46E"/>

      {/* Allée */}
      <polygon points="330,480 350,320 450,320 470,480" fill="#C8C0B0"/>
      {[340,360,380,400,420,440,460].map((x,i)=>(
        <line key={i} x1={x} y1="320" x2={x+(i%2===0?8:-8)} y2="480" stroke="#B8B0A0" strokeWidth="1" opacity="0.5"/>
      ))}

      {/* Façade maison */}
      <rect x="160" y="120" width="480" height="205" fill="#E8E0D0"/>
      {/* Toit */}
      <polygon points="120,120 400,30 680,120" fill="#8B6040"/>
      <polygon points="120,120 400,30 680,120" fill="#9A6A45" opacity="0.3"/>
      {/* Cheminée */}
      <rect x="500" y="42"  width="35" height="55" fill="#8B6040"/>
      <rect x="495" y="40"  width="45" height="8"  fill="#7A5030"/>

      {/* Fenêtres façade */}
      <rect x="185" y="150" width="110" height="100" fill="#A8C8E0" rx="3"/>
      <rect x="190" y="155" width="47"  height="90" fill="#B8D4EC" rx="2"/>
      <rect x="243" y="155" width="47"  height="90" fill="#B8D4EC" rx="2"/>
      <line x1="185" y1="200" x2="295" y2="200" stroke="#90B0C8" strokeWidth="1.5"/>

      <rect x="505" y="150" width="110" height="100" fill="#A8C8E0" rx="3"/>
      <rect x="510" y="155" width="47"  height="90" fill="#B8D4EC" rx="2"/>
      <rect x="563" y="155" width="47"  height="90" fill="#B8D4EC" rx="2"/>
      <line x1="505" y1="200" x2="615" y2="200" stroke="#90B0C8" strokeWidth="1.5"/>

      {/* Porte d'entrée */}
      <rect x="340" y="205" width="120" height="120" fill="#7A5A3A" rx="3"/>
      <rect x="345" y="210" width="48"  height="55"  fill="#8A6A4A" rx="2"/>
      <rect x="399" y="210" width="56"  height="55"  fill="#8A6A4A" rx="2"/>
      <rect x="345" y="272" width="110" height="53"  fill="#8A6A4A" rx="2"/>
      <circle cx="397" cy="262" r="5" fill="#C0A060"/>

      {/* Interphone */}
      <rect x="620" y="240" width="28"  height="48" fill="#D0D0D0" rx="4"/>
      <rect x="624" y="244" width="20"  height="30" fill="#C0C0C0" rx="2"/>
      <circle cx="634" cy="278" r="6" fill="#A0A0A0"/>
      <rect x="626" y="250" width="16" height="3" rx="1" fill="#A0A0A0"/>
      <rect x="626" y="256" width="16" height="3" rx="1" fill="#A0A0A0"/>

      {/* Boîte aux lettres */}
      <rect x="95"  y="278" width="50"  height="38" fill="#4A6080" rx="3"/>
      <rect x="95"  y="278" width="50"  height="14" fill="#3A5070" rx="3"/>
      <rect x="104" y="288" width="32"  height="4"  rx="2" fill="#6080A0"/>
      <rect x="108" y="308" width="6"   height="10" rx="2" fill="#607090"/>

      {/* Portail / clôture */}
      <rect x="30"  y="310" width="8"   height="80" fill="#6A7A5A"/> {/* pilier gauche */}
      <rect x="762" y="310" width="8"   height="80" fill="#6A7A5A"/> {/* pilier droite */}
      {/* Lames portail gauche */}
      {[45,60,75,90,105,120,135].map((x,i)=>(
        <rect key={i} x={x} y="312" width="6" height="78" rx="2" fill="#7A8A6A"/>
      ))}
      {/* Portail ouverture centre (allée) */}
      {[670,685,700,715,730,745].map((x,i)=>(
        <rect key={i} x={x} y="312" width="6" height="78" rx="2" fill="#7A8A6A"/>
      ))}

      {/* Arbres */}
      <rect x="55"  y="240" width="14"  height="80" fill="#8B6040"/>
      <ellipse cx="62" cy="220" rx="38" ry="45" fill="#4A8A4A"/>
      <ellipse cx="62" cy="210" rx="28" ry="35" fill="#5A9A5A"/>

      <rect x="718" y="255" width="14"  height="65" fill="#8B6040"/>
      <ellipse cx="725" cy="235" rx="35" ry="42" fill="#4A8A4A"/>
      <ellipse cx="725" cy="225" rx="25" ry="32" fill="#5A9A5A"/>

      {/* Jardin / buisson */}
      <ellipse cx="200" cy="340" rx="55" ry="22" fill="#5A9A5A"/>
      <ellipse cx="590" cy="345" rx="45" ry="18" fill="#5A9A5A"/>
      <ellipse cx="160" cy="338" rx="30" ry="16" fill="#4A8A4A"/>
      <ellipse cx="620" cy="342" rx="28" ry="14" fill="#4A8A4A"/>
    </>
  );
}

/* ══════════════════════════════════════════════════
   EXPORT PRINCIPAL
══════════════════════════════════════════════════ */
export function RoomIllustration({ piece }: Props) {
  return (
    <Wall>
      {piece === "Cuisine"         && <CuisineSVG />}
      {piece === "Salle de bain"   && <SalleDeBainSVG />}
      {piece === "Salle de séjour" && <SalleDeSejourSVG />}
      {piece === "Extérieur"       && <ExterieurSVG />}
    </Wall>
  );
}
