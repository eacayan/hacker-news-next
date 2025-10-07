import { Maybe, HackerNewsStory, HackerNewsUser } from '@/types';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function getTopStoryIds(): Promise<number[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/topstories.json`);
    if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching top story IDs:', error);
    throw error;
  }
}

async function getStory(id: number): Promise<Maybe<HackerNewsStory>> {
  try {
    const res = await fetch(`${API_BASE_URL}/item/${id}.json`);
    if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    return null;
  }
}

async function getUser(username: string): Promise<Maybe<HackerNewsUser>> {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${username}.json`);
    if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
}

export async function getRandomStories(): Promise<HackerNewsStory[]> {
  try {
    const topIds = await getTopStoryIds();

    // Shuffle and take 10
    const shuffled = topIds.sort(() => Math.random() - 0.5).slice(0, 10);

    const stories = await Promise.all(
      shuffled.map(async (id) => {
        const story = await getStory(id);
        if (!story) return null;
        const { id: storyId, title, by, score, time, url } = story;

        const user = await getUser(by);
        if (!user) return null;
        const { karma } = user;

        return {
          id: storyId,
          title,
          url,
          score,
          by,
          time,
          authorKarma: karma,
        };
      })
    );

    return stories.filter((story) => story !== null).sort((a, b) => a.score - b.score);
  } catch (error) {
    console.error('Error getting random stories:', error);
    return [];
  }
}

export async function getStoryById(id: number): Promise<Maybe<HackerNewsStory>> {
  try {
    const story = await getStory(id);
    if (!story) return null;
    const { id: storyId, title, by, score, time, url } = story;

    const user = await getUser(by);
    if (!user) return null;
    const { karma } = user;

    return {
      id: storyId,
      title,
      url,
      score,
      by,
      time,
      authorKarma: karma,
    };
  } catch (error) {
    console.error(`Error getting story by ID ${id}:`, error);
    return null;
  }
}
