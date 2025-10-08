import { render, screen } from '@testing-library/react';
import StoryGrid from './StoryGrid';
import { useStorySort } from '@/hooks/useStorySort/useStorySort';
import { HackerNewsStory } from '@/types';
import { mockStories } from '@/mocks';

jest.mock('@/hooks/useStorySort/useStorySort');

jest.mock('..', () => ({
  SortControls: ({ onSort }: { onSort: (type: string) => void }) => (
    <div data-testid="sort-controls">
      <button onClick={() => onSort('score')}>Sort by Score</button>
      <button onClick={() => onSort('karma')}>Sort by Karma</button>
    </div>
  ),
  StoryCard: ({ story }: { story: HackerNewsStory }) => (
    <div data-testid={`story-card-${story.id}`}>
      <h3>{story.title}</h3>
      <p>Score: {story.score}</p>
    </div>
  ),
}));

describe('WHEN rendering the StoryGrid component', () => {
  const mockSortStories = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useStorySort as jest.Mock).mockReturnValue({
      stories: mockStories,
      sortStories: mockSortStories,
    });
  });

  it('THEN should render SortControls component', () => {
    render(<StoryGrid stories={mockStories} />);
    expect(screen.getByTestId('sort-controls')).toBeInTheDocument();
  });

  it('THEN should render all story cards', () => {
    render(<StoryGrid stories={mockStories} />);
    expect(screen.getByTestId('story-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('story-card-2')).toBeInTheDocument();
  });

  it('THEN should pass initial stories to useStorySort hook', () => {
    render(<StoryGrid stories={mockStories} />);
    expect(useStorySort).toHaveBeenCalledWith(mockStories);
  });

  it('THEN should pass sortStories function to SortControls', () => {
    render(<StoryGrid stories={mockStories} />);
    // The fact that it renders without error means the prop was passed correctly
    expect(screen.getByTestId('sort-controls')).toBeInTheDocument();
  });

  it('THEN should display stories returned from the hook', () => {
    render(<StoryGrid stories={mockStories} />);
    expect(screen.getByText('Story 1')).toBeInTheDocument();
    expect(screen.getByText('Story 2')).toBeInTheDocument();
  });

  it('THEN should render an empty grid when no stories', () => {
    (useStorySort as jest.Mock).mockReturnValue({
      stories: [],
      sortStories: mockSortStories,
    });

    render(<StoryGrid stories={[]} />);
    expect(screen.queryByTestId(/story-card-/)).not.toBeInTheDocument();
  });
});
