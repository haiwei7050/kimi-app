export type Screen = 'query' | 'result';

export interface IncomeType {
  value: string;
  label: string;
  checked: boolean;
}

export interface ResultItem {
  id: string;
  title: string;
  date: string;
  subType: string;
  company: string;
  income: number;
  taxPaid: number;
}
