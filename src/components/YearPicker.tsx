import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { yearOptions } from '@/data/mockData';

const ITEM_H = 48;
const VISIBLE_H = 240;
const CENTER_Y = VISIBLE_H / 2;
const OFFSET = CENTER_Y - ITEM_H / 2;

interface YearPickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: number;
  onSelect: (year: number) => void;
}

export function YearPicker({ isOpen, onClose, selectedYear, onSelect }: YearPickerProps) {
  const [tempYear, setTempYear] = useState(selectedYear);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // 打开时同步并滚动
  useEffect(() => {
    if (!isOpen) return;
    setTempYear(selectedYear);
    const idx = yearOptions.indexOf(selectedYear);
    const el = scrollerRef.current;
    if (el && idx >= 0) {
      el.scrollTop = idx * ITEM_H;
    }
  }, [isOpen, selectedYear]);

  // 轻量 scroll 更新（RAF 节流）
  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const idx = Math.round(el.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(idx, yearOptions.length - 1));
      setTempYear(yearOptions[clamped]);
    });
  }, []);

  // 点击年份直接滚动到该位置
  const onItemClick = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: index * ITEM_H, behavior: 'smooth' });
  }, []);

  const handleConfirm = useCallback(() => {
    onSelect(tempYear);
    onClose();
  }, [tempYear, onSelect, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={handleCancel}
          />

          {/* Sheet */}
          <motion.div
            className="relative bg-white rounded-t-xl overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-11 border-b border-[#EBEBEB]">
              <button
                className="text-[#666666] text-[16px] active:opacity-50 select-none"
                onClick={handleCancel}
              >
                取消
              </button>
              <button
                className="text-[#4F7EF7] text-[16px] font-medium active:opacity-50 select-none"
                onClick={handleConfirm}
              >
                确定
              </button>
            </div>

            {/* Picker area */}
            <div className="relative h-[240px] overflow-hidden">
              {/* Center highlight line */}
              <div
                className="absolute left-0 right-0 border-t border-b border-[#E5E5EA] pointer-events-none z-10"
                style={{ top: OFFSET, height: ITEM_H }}
              />

              {/* Scrollable list */}
              <div
                ref={scrollerRef}
                className="h-full overflow-y-scroll scrollbar-hide"
                style={{
                  scrollSnapType: 'y mandatory',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                }}
                onScroll={onScroll}
              >
                {/* Top spacer */}
                <div style={{ height: OFFSET }} />

                {yearOptions.map((year, i) => {
                  const selected = year === tempYear;
                  return (
                    <div
                      key={year}
                      className="flex items-center justify-center cursor-pointer select-none"
                      style={{
                        height: ITEM_H,
                        scrollSnapAlign: 'center',
                      }}
                      onClick={() => onItemClick(i)}
                    >
                      <span
                        className={`transition-colors duration-100 ${
                          selected
                            ? 'text-[16px] text-[#000000]'
                            : 'text-[16px] text-[#C5C5C7]'
                        }`}
                      >
                        {year}
                      </span>
                    </div>
                  );
                })}

                {/* Bottom spacer */}
                <div style={{ height: OFFSET }} />
              </div>
            </div>

            {/* Safe area */}
            <div className="h-5 bg-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
