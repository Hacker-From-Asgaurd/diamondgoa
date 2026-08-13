import React from 'react';

export const BeachIllustration: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden bg-transparent select-none z-10">
      <div className="w-full max-w-[1600px] mx-auto relative flex flex-col items-center">
        
        {/* Vector SVG Goa Beach Environmental Poster Scene */}
        <svg
          viewBox="0 0 1440 500"
          className="w-full h-auto object-cover max-h-[48vh] sm:max-h-[52vh]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Base Sky & Horizon Color matching #063D27 */}
          <rect width="1440" height="500" fill="#063D27" />

          {/* Distant Rolling Hills Silhouettes */}
          <path d="M 0,330 C 250,290 550,320 720,330 C 900,340 1200,300 1440,330 V 500 H 0 Z" fill="#042817" />
          <path d="M 0,350 C 350,330 650,350 850,340 C 1100,330 1350,350 1440,350 V 500 H 0 Z" fill="#05331F" />

          {/* Center Sun & Rays */}
          <g stroke="#FFE000" strokeWidth="2.5" strokeLinecap="round" opacity="0.95">
            <line x1="720" y1="230" x2="720" y2="295" />
            <line x1="660" y1="240" x2="678" y2="300" />
            <line x1="780" y1="240" x2="762" y2="300" />
            <line x1="605" y1="262" x2="640" y2="315" />
            <line x1="835" y1="262" x2="800" y2="315" />
            <line x1="555" y1="295" x2="605" y2="335" />
            <line x1="885" y1="295" x2="835" y2="335" />
            <line x1="515" y1="335" x2="575" y2="360" />
            <line x1="925" y1="335" x2="865" y2="360" />
            <line x1="485" y1="375" x2="550" y2="385" />
            <line x1="955" y1="375" x2="890" y2="385" />
          </g>

          {/* Semi-circular Giant Sun */}
          <circle cx="720" cy="400" r="115" fill="#FFE000" />

          {/* Ocean Water Inlet & Sun Reflections */}
          <path d="M 520,400 C 620,385 820,385 920,400 C 850,450 590,450 520,400 Z" fill="#032113" />
          <g stroke="#FFE000" strokeWidth="3" strokeLinecap="round">
            <line x1="650" y1="410" x2="790" y2="410" />
            <line x1="670" y1="422" x2="770" y2="422" />
            <line x1="695" y1="434" x2="745" y2="434" />
          </g>

          {/* Cream Sandy Beach Shoreline */}
          <path d="M 0,390 C 350,370 1050,375 1440,380 V 500 H 0 Z" fill="#FFF8E7" />

          {/* Bottom Left Corner Palm Leaves Framing */}
          <g fill="#021C11">
            <path d="M -20,500 Q 60,420 150,435 Q 80,470 -20,500 Z" />
            <path d="M -20,500 Q 100,375 190,395 Q 110,450 -20,500 Z" />
            <path d="M -20,500 Q 40,340 120,355 Q 60,410 -20,500 Z" />
            <path d="M -20,500 Q -10,310 65,325 Q 20,385 -20,500 Z" />
          </g>

          {/* Left Curving Asphalt Road */}
          <path d="M -20,410 Q 180,440 380,510 H -20 Z" fill="#1C2621" />
          <path d="M -20,410 Q 180,440 380,510" stroke="#FFE000" strokeWidth="3" strokeDasharray="16 16" />

          {/* Indian Roadside Signpost: "गोवा बीच / GOA BEACH →" */}
          <g transform="translate(180, 370)">
            {/* Wooden Posts */}
            <rect x="25" y="60" width="6" height="50" fill="#042C19" />
            <rect x="85" y="60" width="6" height="50" fill="#042C19" />
            
            {/* Hot Pink Board */}
            <rect x="0" y="0" width="116" height="64" rx="4" fill="#FF006B" stroke="#FFE000" strokeWidth="3" />
            
            {/* Hindi & English Text */}
            <text x="58" y="26" fontFamily="'Rozha One', 'Yatra One', serif" fontSize="18" fontWeight="bold" fill="#FFE000" textAnchor="middle">
              गोवा बीच
            </text>
            <text x="58" y="48" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#FFE000" letterSpacing="1" textAnchor="middle">
              GOA BEACH →
            </text>
          </g>

          {/* Yellow Beach Umbrella & Reclining Chair */}
          <g transform="translate(350, 415)">
            {/* Umbrella Pole */}
            <line x1="30" y1="15" x2="30" y2="60" stroke="#042C19" strokeWidth="3.5" />
            {/* Umbrella Canopy */}
            <path d="M 0,25 C 0,5 60,5 60,25 Z" fill="#FFE000" stroke="#042C19" strokeWidth="2.5" />
            {/* Reclining Beach Chair */}
            <path d="M 45,45 L 75,45 L 85,60 M 55,45 L 60,60" stroke="#042C19" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* Flying Birds Vectors */}
          <g stroke="#042C19" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M 480 260 Q 486 254 492 260 Q 498 254 504 260" />
            <path d="M 515 250 Q 520 245 525 250 Q 530 245 535 250" />
            <path d="M 495 275 Q 500 270 505 275 Q 510 270 515 275" />
          </g>

          {/* Right Beach Shack / Hut */}
          <g transform="translate(980, 340)">
            {/* Main Wooden Shack Structure */}
            <rect x="20" y="70" width="310" height="90" fill="#042C19" stroke="#021B0F" strokeWidth="3" />
            
            {/* Thatched Roof */}
            <polygon points="-10,70 175,10 340,70" fill="#032113" stroke="#01120A" strokeWidth="4" />

            {/* Glowing String Lights along Roof Line */}
            <g fill="#FFE000">
              <circle cx="10" cy="70" r="3.5" />
              <circle cx="45" cy="55" r="3.5" />
              <circle cx="80" cy="40" r="3.5" />
              <circle cx="115" cy="25" r="3.5" />
              <circle cx="150" cy="18" r="3.5" />
              <circle cx="185" cy="20" r="3.5" />
              <circle cx="220" cy="32" r="3.5" />
              <circle cx="255" cy="45" r="3.5" />
              <circle cx="290" cy="58" r="3.5" />
              <circle cx="320" cy="70" r="3.5" />
            </g>

            {/* Wooden Signboard on Hut Roof */}
            <g transform="translate(85, 42)">
              <rect x="0" y="0" width="160" height="42" fill="#032113" stroke="#FFE000" strokeWidth="2" rx="3" />
              <text x="80" y="13" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#FFE000" textAnchor="middle" letterSpacing="1">
                GOOD VIBES
              </text>
              <text x="80" y="25" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#FFE000" textAnchor="middle" letterSpacing="1">
                GOOD CODE
              </text>
              <text x="80" y="37" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#FFE000" textAnchor="middle" letterSpacing="1">
                GREAT PEOPLE
              </text>
            </g>

            {/* Doorway & Window */}
            <rect x="150" y="95" width="45" height="65" fill="#01120A" />
            <rect x="50" y="95" width="40" height="35" fill="#FFE000" opacity="0.8" stroke="#01120A" strokeWidth="2" />

            {/* Surfboards Leaning Against Hut */}
            <g transform="translate(45, 75)">
              {/* Surfboard 1: Cream */}
              <ellipse cx="210" cy="50" rx="12" ry="40" fill="#FFF8E7" stroke="#042C19" strokeWidth="2.5" transform="rotate(-12, 210, 50)" />
              <line x1="205" y1="12" x2="200" y2="88" stroke="#FF006B" strokeWidth="2" />

              {/* Surfboard 2: Yellow */}
              <ellipse cx="235" cy="50" rx="12" ry="40" fill="#FFE000" stroke="#042C19" strokeWidth="2.5" transform="rotate(-5, 235, 50)" />
              <line x1="235" y1="10" x2="235" y2="90" stroke="#042C19" strokeWidth="2" />

              {/* Surfboard 3: Yellow Stripe */}
              <ellipse cx="260" cy="52" rx="11" ry="38" fill="#FFE000" stroke="#042C19" strokeWidth="2.5" transform="rotate(8, 260, 52)" />
            </g>
          </g>

          {/* Left Framing Palm Tree Silhouette */}
          <g className="animate-palm-sway">
            {/* Trunk */}
            <path d="M -30,500 C 20,380 60,250 120,150" stroke="#032113" strokeWidth="18" strokeLinecap="round" />
            <path d="M -30,500 C 20,380 60,250 120,150" stroke="#FFE000" strokeWidth="2.5" strokeDasharray="14 14" opacity="0.7" />
            
            {/* Fronds Left */}
            <g stroke="#032113" strokeWidth="12" strokeLinecap="round" fill="none">
              <path d="M 120,150 C 70,90 0,110 -50,160" />
              <path d="M 120,150 C 90,60 170,30 230,80" />
              <path d="M 120,150 C 170,140 240,190 260,260" />
              <path d="M 120,150 C 50,170 -10,230 -30,300" />
            </g>
          </g>

          {/* Right Framing Tall Palm Tree Silhouette */}
          <g className="animate-palm-sway">
            {/* Trunk */}
            <path d="M 1320,500 C 1300,340 1270,180 1220,70" stroke="#032113" strokeWidth="20" strokeLinecap="round" />
            <path d="M 1320,500 C 1300,340 1270,180 1220,70" stroke="#FFE000" strokeWidth="3" strokeDasharray="16 16" opacity="0.6" />

            {/* Rotated Date Text along Trunk */}
            <text x="1310" y="380" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#FFE000" transform="rotate(-82, 1310, 380)" letterSpacing="4">
              28 - 31 OCT 2026
            </text>

            {/* Fronds Right */}
            <g stroke="#032113" strokeWidth="14" strokeLinecap="round" fill="none">
              <path d="M 1220,70 C 1280,20 1370,40 1440,90" />
              <path d="M 1220,70 C 1240,0 1150,-20 1080,40" />
              <path d="M 1220,70 C 1160,70 1090,130 1070,200" />
              <path d="M 1220,70 C 1290,100 1380,160 1420,230" />
            </g>
          </g>
        </svg>

      </div>
    </div>
  );
};



