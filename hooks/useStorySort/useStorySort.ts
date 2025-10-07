import { useState, useCallback } from 'react';
import { SortType, HackerNewsStory } from '@/types';

export function useStorySort(initialStories: HackerNewsStory[]) {
  const [stories, setStories] = useState(initialStories);

  const sortStories = useCallback((type: SortType) => {
    setStories((prev) => {
      const sorted = [...prev].sort((a, b) => {
        switch (type) {
          case 'score':
            return a.score - b.score;
          case 'karma':
            return (a.authorKarma || 0) - (b.authorKarma || 0);
          default:
            return 0;
        }
      });
      return sorted;
    });
  }, []);

  return { stories, sortStories };
}
