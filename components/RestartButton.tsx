import type React from "react"

interface RestartButtonProps {
  onClick: () => void
  className?: string
}

const RestartButton: React.FC<RestartButtonProps> = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 z-30 backdrop-blur-sm border border-white border-opacity-20 ${className}`}
    aria-label="Restart from beginning"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
  </button>
)

export default RestartButton 