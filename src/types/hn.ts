export interface HNItem {
  id: number;
  type: string;
  by: string;
  time: number;
  title?: string;
  url?: string;
  score?: number;
  descendants?: number;
  kids?: number[];
  text?: string;
}
