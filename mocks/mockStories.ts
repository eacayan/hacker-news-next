import { HackerNewsStory } from '@/types';

export const mockStories: HackerNewsStory[] = [
  {
    id: 1,
    title: 'Story 1',
    url: 'https://example.com/1',
    score: 100,
    by: 'user1',
    time: 1234567890,
    authorKarma: 5000,
  },
  {
    id: 2,
    title: 'Story 2',
    url: 'https://example.com/2',
    score: 50,
    by: 'user2',
    time: 1234567891,
    authorKarma: 1000,
  },
  {
    id: 3,
    title: 'Story 3',
    url: 'https://example.com/3',
    score: 200,
    by: 'user3',
    time: 1234567892,
    authorKarma: 250,
  },
];
