'use client';

import { HackerNewsStory } from '@/types';
import { SortControls, StoryCard } from '..';
import { useStorySort } from '@/hooks/useStorySort/useStorySort';

import styles from './StoryGrid.module.scss';

interface StoryGridProps {
  stories: HackerNewsStory[];
}

export default function StoryGrid({ stories: initial }: StoryGridProps) {
  const { stories, sortStories } = useStorySort(initial);

  return (
    <>
      <SortControls onSort={sortStories} />
      <div className={styles.grid}>
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </>
  );
}
