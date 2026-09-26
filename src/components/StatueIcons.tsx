import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

/**
 * Hermes / Mercury Icon (Deals, Commerce, Negotiation)
 * Classical Greek contour bust with winged helmet and toga drapery
 */
export function HermesIcon({ className = 'w-12 h-12', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Wing on helmet */}
      <path d="M34 14C36 7 43 4 51 4C47 8 44 13 41 17" />
      <path d="M44 9C47 13 45 18 40 21" />
      <path d="M39 16C41 19 39 23 35 24" />

      {/* Helmet dome & rim */}
      <path d="M20 22C20 15 28 12 37 14C42 16 45 20 46 25" />
      <path d="M18 24C26 21 38 21 46 25" />

      {/* Classical Greek profile */}
      <path d="M43 25L47 31L43 33C44 34 45 35 43 36C44 37 44 40 41 41L33 41" />

      {/* Eye & Brow */}
      <path d="M36 26C38 26 40 27 40 27" />
      <path d="M35 24C37 23 40 24 41 25" />

      {/* Ear */}
      <path d="M29 27C28 27 27 29 28 31C29 33 31 33 31 31" />

      {/* Hair curls below helmet */}
      <path d="M21 25C23 27 24 29 23 32" />
      <path d="M24 29C26 31 27 34 26 36" />

      {/* Neck */}
      <path d="M33 41L34 49" />
      <path d="M24 36L25 49" />

      {/* Toga drapery & shoulder */}
      <path d="M16 58C21 51 28 48 37 49C45 50 50 54 54 58" />
      <path d="M27 50C30 53 32 57 33 60" />
      <path d="M38 49C41 52 44 56 46 60" />
    </svg>
  )
}

/**
 * Thinking Socrates Icon (Disputes, Arbitration, Philosophical Defense)
 * Classical contour bust of Socrates with hand to chin in deep thought
 */
export function SocratesIcon({ className = 'w-12 h-12', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Cranium & Bald Forehead */}
      <path d="M22 18C25 13 33 12 37 14C41 16 43 19 44 23" />

      {/* Contemplation Brow & Greek Nose */}
      <path d="M34 21C38 20 41 21 42 23" />
      <path d="M42 23L46 29L41 31" />

      {/* Eye looking down in thought */}
      <path d="M36 25C38 26 40 26 40 27" />

      {/* Mustache & Mouth */}
      <path d="M41 32C43 33 44 34 42 36" />

      {/* Luxurious Classical Beard */}
      <path d="M42 36C45 38 46 42 44 46C42 50 37 53 32 53" />
      <path d="M35 38C38 40 37 44 34 46" />
      <path d="M39 42C41 45 39 48 36 50" />

      {/* Hand supporting chin (The Thinker pose) */}
      <path d="M43 56L44 48C45 44 44 41 43 38" />
      <path d="M41 38C40 37 38 38 38 40" />
      <path d="M41 42C39 43 36 43 34 43" />

      {/* Back of Head & Curls */}
      <path d="M22 18C18 23 17 31 20 37L22 47" />
      <path d="M21 24C23 27 25 26 27 29" />
      <path d="M20 31C22 34 24 33 26 36" />

      {/* Ear */}
      <path d="M29 26C28 26 27 28 28 30C29 32 31 32 31 30" />

      {/* Philosopher's Himation / Robe */}
      <path d="M15 58C20 51 27 49 35 51L49 58" />
      <path d="M25 52C28 54 31 57 32 60" />
    </svg>
  )
}

/**
 * Tyche / Fortuna Icon (Private Wealth, Family Capital, Abundance & Heritage)
 * Classical Greek contour goddess with diadem and horn of abundance
 */
export function TycheIcon({ className = 'w-12 h-12', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Classical Diadem / Crown */}
      <path d="M22 17C28 14 38 14 44 19" />
      <path d="M25 15L27 9L30 14L33 7L36 14L39 10L42 17" />

      {/* Hair gathered in classical chignon */}
      <path d="M22 17C16 19 13 25 14 31C15 36 19 38 23 37" />
      <path d="M17 25C20 28 23 27 25 30" />

      {/* Serene Goddess Profile */}
      <path d="M41 19L45 27L41 29C42 30 43 31 41 32C42 34 41 36 38 37L31 37" />

      {/* Eye & Brow */}
      <path d="M35 24C37 24 39 25 39 25" />
      <path d="M34 22C36 21 39 22 40 23" />

      {/* Ear & Earring */}
      <path d="M28 27C27 27 26 29 27 31C28 33 30 33 30 31" />
      <circle cx="28.5" cy="35" r="1.5" />

      {/* Neck */}
      <path d="M38 37C38 42 38 46 39 49" />
      <path d="M26 37L27 49" />

      {/* Flowing Peplos Drapery */}
      <path d="M17 58C22 51 29 48 37 49C44 50 49 54 53 58" />
      <path d="M28 50C31 53 33 57 34 60" />

      {/* Horn of Abundance (Cornucopia) subtle contour */}
      <path d="M46 54C50 48 53 42 51 35C49 29 45 28 44 29" />
      <path d="M44 30C47 28 50 30 52 35" />
    </svg>
  )
}
