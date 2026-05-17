import { Check } from 'lucide-react';
import type { IncomeType } from '@/types';

interface RadioGroupProps {
  options: IncomeType[];
  onChange: (value: string) => void;
}

export function RadioGroup({ options, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center gap-[14px] py-[14px] border-b border-[#F0F0F0] last:border-b-0 cursor-pointer active:bg-[#FAFAFA]"
          onClick={() => onChange(option.value)}
        >
          {/* Radio Circle */}
          <div
            className={`w-[23px] h-[23px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150 self-center ${
              option.checked
                ? 'bg-[#4F7EF7]'
                : 'bg-white border-[1.5px] border-[#CCCCCC]'
            }`}
          >
            {option.checked && (
              <Check size={13} strokeWidth={3} className="text-white" />
            )}
          </div>

          {/* Label Text */}
          <span className="text-[17px] text-[#333333] flex-1 leading-[23px] self-center">{option.label}</span>
        </div>
      ))}
    </div>
  );
}
