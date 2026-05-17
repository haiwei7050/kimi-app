import { ChevronLeft } from 'lucide-react';
import type { Screen } from '@/types';

interface AppHeaderProps {
  mode: Screen;
  onBack: () => void;
}

export function AppHeader({ mode, onBack }: AppHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 h-[44px] bg-white flex items-center justify-between px-4"
      style={{ borderBottom: '1px solid #E3E5E6' }}
    >
      {mode === 'result' && (
        <button
          className="flex items-center text-[#4F7EF7] active:opacity-60 transition-opacity select-none z-10"
          onClick={onBack}
        >
          <ChevronLeft size={26} strokeWidth={2} />
          <span className="text-[15px] font-normal ml-[-2px]">返回</span>
        </button>
      )}

      <h1 className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[17px] font-normal text-[#333333] tracking-tight">收入纳税明细</span>
      </h1>

      {mode === 'result' && (
        <button className="text-[#4F7EF7] text-[15px] font-medium active:opacity-60 transition-opacity select-none z-10">
          批量申诉
        </button>
      )}
    </header>
  );
}
