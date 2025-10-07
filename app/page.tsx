import { StoryGrid } from '@/components';
import { getRandomStories } from '@/lib/api';

export default async function HomePage() {
  const stories = await getRandomStories();

  return <StoryGrid stories={stories} />;
}
