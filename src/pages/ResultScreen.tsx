import { ChevronRight } from 'lucide-react';
import { getYearData } from '@/data/taxData';
import type { TaxDetail } from '@/data/taxData';

interface ResultScreenProps {
  year: number;
}

function HelpIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" className="text-[#5B8FF9]">
      <circle cx="8.5" cy="8.5" r="7.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="8.5" y="12.5" fontSize="11" fill="currentColor" textAnchor="middle" fontFamily="system-ui, sans-serif">?</text>
    </svg>
  );
}

function SummaryRow({ label, value, hasHelp, showDivider }: { label: string; value: string; hasHelp?: boolean; showDivider?: boolean }) {
  return (
    <>
      {showDivider && (
        <div style={{ width: '100%', height: '1px', backgroundColor: '#F0F0F0' }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', paddingBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', color: '#333333' }}>{label}</span>
          {hasHelp && (
            <span style={{ marginLeft: '4px', marginRight: '2px' }}>
              <HelpIcon />
            </span>
          )}
          <span style={{ fontSize: '16px', color: '#333333' }}>：</span>
        </div>
        <span style={{ fontSize: '15px', color: '#333333' }}>{value}</span>
      </div>
    </>
  );
}

function WageCard({ item }: { item: TaxDetail }) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingLeft: '16px', paddingRight: '0px', paddingTop: '14px', paddingBottom: '12px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px', marginBottom: '4px' }}>
        <span style={{ fontSize: '17px', fontWeight: 600, color: '#333333', flex: 1, lineHeight: '24px' }}>工资薪金</span>
        <span style={{ fontSize: '17px', color: '#333333', lineHeight: '24px', marginRight: '45px' }}>{item.年月}</span>
      </div>

      {/* Detail rows - 100%原样使用JSON数据 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ fontSize: '15px', color: '#9B9B9B', lineHeight: '24px' }}>
          所得项目小类：{item.所得项目小类}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', color: '#9B9B9B', lineHeight: '24px' }}>扣缴义务人：{item.扣缴义务人}</span>
          <ChevronRight size={24} style={{ color: '#C7C7C7', flexShrink: 0 }} />
        </div>
        <div style={{ fontSize: '15px', color: '#9B9B9B', lineHeight: '24px' }}>
          收入：{item.收入.toFixed(2)}元
        </div>
        <div style={{ fontSize: '15px', color: '#9B9B9B', lineHeight: '24px' }}>
          已申报税额：{item.已申报税额.toFixed(2)}元
        </div>
      </div>
    </div>
  );
}

export function ResultScreen({ year }: ResultScreenProps) {
  const yearData = getYearData(year);

  if (!yearData) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F6F9' }}>
        <span style={{ fontSize: '16px', color: '#999999' }}>暂无{year}年数据</span>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#F4F6F9' }}>
      {/* Summary block */}
      <div style={{ backgroundColor: '#FFFFFF', marginTop: '12px', paddingLeft: '16px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' }}>
        <SummaryRow label="收入合计" value={`${yearData.收入合计.toFixed(2)}元`} hasHelp />
        <SummaryRow label="已申报税额合计" value={`${yearData.已申报税额合计.toFixed(2)}元`} showDivider />
      </div>

      {/* Gray gap between summary and first card */}
      <div style={{ height: '14px', backgroundColor: '#F4F6F9', flexShrink: 0 }} />

      {/* Scrollable card list - 降序排列 */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        {yearData.收入明细.map((item, index) => (
          <div key={`${item.年月}-${index}`}>
            <WageCard item={item} />
            {index < yearData.收入明细.length - 1 && (
              <div style={{ height: '13px', backgroundColor: '#F4F6F9' }} />
            )}
          </div>
        ))}
        {/* Bottom gray gap - matches top gap */}
        <div style={{ height: '14px', backgroundColor: '#F4F6F9', flexShrink: 0 }} />
      </div>
    </div>
  );
}
