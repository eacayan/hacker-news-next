export interface HackerNewsStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  authorKarma?: number;
}

export interface HackerNewsUser {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

export type Maybe<T> = T | null;

export const SortTypeOptions = ['score', 'karma'] as const;

export type SortType = (typeof SortTypeOptions)[number];
