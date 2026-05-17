interface AnimatedButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function AnimatedButton({ label, onClick, className = '' }: AnimatedButtonProps) {
  return (
    <button
      className={`w-full h-[46px] bg-[#4F7EF7] text-white text-[17px] font-medium rounded-[6px] active:bg-[#3D6BD9] active:scale-[0.98] transition-all duration-150 select-none ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
