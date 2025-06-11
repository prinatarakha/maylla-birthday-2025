import type React from "react"

interface ScrollUpButtonProps {
  onClick: () => void
  className?: string
}

const ScrollUpButton: React.FC<ScrollUpButtonProps> = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 z-30 backdrop-blur-sm border border-white border-opacity-20 ${className}`}
    aria-label="Scroll up"
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
      <path d="m18 15-6-6-6 6"/>
    </svg>
  </button>
)

export default ScrollUpButton 