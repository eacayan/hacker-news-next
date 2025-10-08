import { renderHook, act } from '@testing-library/react';
import { useStorySort } from './useStorySort';
import { HackerNewsStory } from '@/types';
import { mockStories } from '@/mocks';

describe('WHEN testing the useStorySort hook', () => {
  it('THEN should initialize with the provided stories', () => {
    const { result } = renderHook(() => useStorySort(mockStories));

    expect(result.current.stories).toEqual(mockStories);
  });

  it('THEN should sort stories by score in ascending order', () => {
    const { result } = renderHook(() => useStorySort(mockStories));

    act(() => {
      result.current.sortStories('score');
    });

    expect(result.current.stories[0].score).toBe(50);
    expect(result.current.stories[1].score).toBe(100);
    expect(result.current.stories[2].score).toBe(200);
  });

  it('THEN should sort stories by karma in ascending order', () => {
    const { result } = renderHook(() => useStorySort(mockStories));

    act(() => {
      result.current.sortStories('karma');
    });

    expect(result.current.stories[0].authorKarma).toBe(250);
    expect(result.current.stories[1].authorKarma).toBe(1000);
    expect(result.current.stories[2].authorKarma).toBe(5000);
  });

  it('THEN should handle stories with undefined authorKarma', () => {
    const storiesWithUndefinedKarma: HackerNewsStory[] = [
      { ...mockStories[0], authorKarma: undefined },
      { ...mockStories[1], authorKarma: 100 },
      { ...mockStories[2], authorKarma: undefined },
    ];

    const { result } = renderHook(() => useStorySort(storiesWithUndefinedKarma));

    act(() => {
      result.current.sortStories('karma');
    });

    expect(result.current.stories[0].authorKarma).toBeUndefined();
    expect(result.current.stories[1].authorKarma).toBeUndefined();
    expect(result.current.stories[2].authorKarma).toBe(100);
  });

  it('THEN should handle empty stories array', () => {
    const { result } = renderHook(() => useStorySort([]));

    act(() => {
      result.current.sortStories('score');
    });

    expect(result.current.stories).toEqual([]);
  });
});
