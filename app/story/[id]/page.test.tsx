import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import StoryPage from './page';
import { getStoryById } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { mockStories } from '@/mocks';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = ({
    src,
    alt,
    width,
    height,
    className,
    priority,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
  }) => {
    /* eslint-disable @next/next/no-img-element */
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-priority={priority}
      />
    );
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('@/lib/api', () => ({
  getStoryById: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  formatDate: jest.fn(),
}));

describe('WHEN directed to the individual story page', () => {
  const mockStory = mockStories[2];

  beforeEach(() => {
    jest.clearAllMocks();
    (formatDate as jest.Mock).mockReturnValue('January 1, 2024');
  });

  it('THEN should render story title', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    expect(screen.getByRole('heading', { name: 'Story 3' })).toBeInTheDocument();
  });

  it('THEN should render story image with correct attributes', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    const image = screen.getByAltText('Story 3 by user3');
    expect(image).toHaveAttribute('src', 'https://picsum.photos/seed/3/800/400');
    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '400');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('THEN should render score metadata', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('200 points')).toBeInTheDocument();
  });

  it('THEN should render author metadata', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('user3')).toBeInTheDocument();
  });

  it('THEN should render author karma', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    expect(screen.getByText('Author Karma')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
  });

  it('THEN should render posted date', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    expect(formatDate).toHaveBeenCalledWith(1234567892);
    expect(screen.getByText('Posted')).toBeInTheDocument();
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
  });

  it('THEN should render article link when url exists', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(mockStory);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    const articleLink = screen.getByRole('link', { name: /read full article/i });
    expect(articleLink).toHaveAttribute('href', 'https://example.com/3');
    expect(articleLink).toHaveAttribute('target', '_blank');
    expect(articleLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('THEN should not render article link when url is undefined', async () => {
    const storyWithoutUrl = { ...mockStory, url: undefined };
    (getStoryById as jest.Mock).mockResolvedValue(storyWithoutUrl);

    const params = Promise.resolve({ id: '3' });
    render(await StoryPage({ params }));

    expect(screen.queryByRole('link', { name: /read full article/i })).not.toBeInTheDocument();
  });

  it('THEN should call notFound when story is null', async () => {
    (getStoryById as jest.Mock).mockResolvedValue(null);
    const params = Promise.resolve({ id: '99999' });

    await expect(StoryPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});
