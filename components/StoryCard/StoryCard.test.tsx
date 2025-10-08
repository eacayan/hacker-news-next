import { render, screen } from '@testing-library/react';
import StoryCard from './StoryCard';
import { formatTime } from '@/lib/utils';
import { mockStories } from '@/mocks';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  };
  return MockImage;
});

jest.mock('@/lib/utils', () => ({
  formatTime: jest.fn(),
}));

describe('WHEN rendering the StoryCard component', () => {
  const mockStory = mockStories[0];

  beforeEach(() => {
    jest.clearAllMocks();
    (formatTime as jest.Mock).mockReturnValue('2 hours ago');
  });

  it('THEN should render the story title', () => {
    render(<StoryCard story={mockStory} />);
    expect(screen.getByText('Story 1')).toBeInTheDocument();
  });

  it('THEN should render the story score', () => {
    render(<StoryCard story={mockStory} />);
    expect(screen.getByText('100 points')).toBeInTheDocument();
  });

  it('THEN should render the author name', () => {
    render(<StoryCard story={mockStory} />);
    expect(screen.getByText(/user1/)).toBeInTheDocument();
  });

  it('THEN should render the author karma', () => {
    render(<StoryCard story={mockStory} />);
    expect(screen.getByText('5,000 karma')).toBeInTheDocument();
  });

  it('THEN should render formatted time', () => {
    render(<StoryCard story={mockStory} />);
    expect(formatTime).toHaveBeenCalledWith(1234567890);
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('THEN should render image with correct src', () => {
    render(<StoryCard story={mockStory} />);
    const image = screen.getByAltText('Story 1 by user1');
    expect(image).toHaveAttribute('src', 'https://picsum.photos/seed/1/400/300');
  });

  it('THEN should render link to story detail page', () => {
    render(<StoryCard story={mockStory} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/story/1');
  });

  it('THEN should handle story without authorKarma', () => {
    const storyWithoutKarma = { ...mockStory, authorKarma: undefined };
    render(<StoryCard story={storyWithoutKarma} />);
    expect(screen.getByText(/karma/)).toBeInTheDocument();
  });
});
