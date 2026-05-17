import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { YearPicker } from '@/components/YearPicker';
import { RadioGroup } from '@/components/RadioGroup';
import { AnimatedButton } from '@/components/AnimatedButton';
import { defaultIncomeTypes } from '@/data/mockData';
import type { IncomeType } from '@/types';

interface QueryScreenProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  onQuery: () => void;
}

export function QueryScreen({ selectedYear, onYearChange, onQuery }: QueryScreenProps) {
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>(defaultIncomeTypes);

  const handleToggleIncomeType = (value: string) => {
    setIncomeTypes(prev =>
      prev.map(type =>
        type.value === value ? { ...type, checked: !type.checked } : type
      )
    );
  };

  return (
    <div className="h-full bg-[#F5F6FA] flex flex-col overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="pt-[10px] pb-6">
          {/* Year Selection Section */}
          <div className="bg-white mb-[8px]">
            {/* Section Title */}
            <div className="px-4 py-[14px] flex items-center gap-[6px] border-b border-[#EBEBEB]">
              <div className="w-[4px] h-4 bg-[#4F7EF7] rounded-sm" />
              <span className="text-[16px] font-bold text-[#1A1A1A]">请选择纳税年度</span>
            </div>

            {/* Year Selection Row */}
            <div
              className="flex items-center justify-between px-4 pt-[16px] pb-[18px] cursor-pointer active:bg-[#F9F9F9] transition-colors"
              onClick={() => setIsYearPickerOpen(true)}
            >
              <div className="flex items-center">
                <span className="text-[16px] text-[#666666]">年度</span>
                <span className="text-[16px] text-[#333333] ml-[96px]">{selectedYear}</span>
              </div>
              <ChevronRight size={16} className="text-[#CCCCCC]" />
            </div>
          </div>

          {/* Income Type Selection Section */}
          <div className="bg-white">
            {/* Section Title */}
            <div className="px-4 py-[14px] flex items-center gap-[6px] border-b border-[#EBEBEB]">
              <div className="w-[4px] h-4 bg-[#4F7EF7] rounded-sm" />
              <span className="text-[16px] font-bold text-[#1A1A1A]">请选择所得类型</span>
            </div>

            <div className="px-4">
              <RadioGroup options={incomeTypes} onChange={handleToggleIncomeType} />
            </div>

            {/* Other Types Dropdown */}
            <div className="flex items-center justify-center py-[14px] border-t border-[#EBEBEB]">
              <span className="flex items-center gap-[4px] text-[#4F7EF7] text-[15px] font-medium">
                <span>其他类型</span>
                <img src="/arrow-down.png" alt="" className="w-[18px] h-[18px]" />
              </span>
            </div>
          </div>

          {/* Spacer before button */}
          <div className="h-[16px]" />

          {/* Query Button */}
          <div className="px-4">
            <AnimatedButton label="查询" onClick={onQuery} />
          </div>
        </div>
      </div>

      {/* Year Picker Modal */}
      <YearPicker
        isOpen={isYearPickerOpen}
        onClose={() => setIsYearPickerOpen(false)}
        selectedYear={selectedYear}
        onSelect={onYearChange}
      />
    </div>
  );
}
