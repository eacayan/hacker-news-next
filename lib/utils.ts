import { SortType, SortTypeOptions } from '@/types';

// Time & Date helpers
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

// Type safety helpers
export function isSortType(value: string): value is SortType {
  return (SortTypeOptions as readonly string[]).includes(value);
}
