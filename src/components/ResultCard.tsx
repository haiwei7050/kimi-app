import { ChevronRight } from 'lucide-react';
import type { ResultItem } from '@/types';

interface ResultCardProps {
  item: ResultItem;
}

export function ResultCard({ item }: ResultCardProps) {
  return (
    <div className="bg-white p-4 mb-[3px] active:bg-[#F9F9F9] transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-semibold text-[#1A1A1A]">{item.title}</span>
        <div className="flex items-center gap-1">
          <span className="text-base font-medium text-[#1A1A1A]">{item.date}</span>
          <ChevronRight size={16} className="text-[#CCCCCC]" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <span className="text-sm text-[#666666]">所得项目小类：{item.subType}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-[#666666]">扣缴义务人：{item.company}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-[#666666]">收入：{item.income.toFixed(2)}元</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-[#666666]">已申报税额：{item.taxPaid.toFixed(2)}元</span>
        </div>
      </div>
    </div>
  );
}
