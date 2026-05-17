import type { IncomeType, ResultItem } from '@/types';

export const defaultIncomeTypes: IncomeType[] = [
  { label: '工资薪金', value: 'salary', checked: true },
  { label: '劳务报酬', value: 'labor', checked: true },
  { label: '稿酬', value: 'royalty', checked: true },
  { label: '特许权使用费', value: 'franchise', checked: true },
];

import { availableYears } from './taxData';
export const yearOptions = availableYears;

// 根据年份动态生成12个月的工资数据
export function generateResultsByYear(year: number): ResultItem[] {
  const baseIncome = 22000 + (year - 2019) * 800;
  const baseTax = 1200 + (year - 2019) * 150;
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  return months.map((month, index) => {
    // 每个月稍微不同的金额，倒序排列（12月到1月）
    const variance = (11 - index) * 350;
    const income = baseIncome + variance + Math.random() * 200;
    const tax = baseTax + variance * 0.15 + Math.random() * 50;

    return {
      id: `${year}-${month}`,
      title: '工资薪金',
      date: `${year}-${month}`,
      subType: '正常工资薪金',
      company: '陕西航星数科信息技术有限公司',
      income: Math.round(income * 100) / 100,
      taxPaid: Math.round(tax * 100) / 100,
    };
  }).reverse(); // 倒序，让最新的月份在前面
}

export function getSummary(results: ResultItem[]) {
  const totalIncome = results.reduce((sum, item) => sum + item.income, 0);
  const totalTax = results.reduce((sum, item) => sum + item.taxPaid, 0);
  return {
    totalIncome: totalIncome.toFixed(2),
    totalTax: totalTax.toFixed(2),
  };
}
