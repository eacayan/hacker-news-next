import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getStoryById } from '@/lib/api';
import { formatDate } from '@/lib/utils';

import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;
  const story = await getStoryById(parseInt(id));

  if (!story) {
    notFound();
  }
  const { id: storyId, title, by, score, time, authorKarma } = story;

  return (
    <>
      <Link href="/" className={styles.backButton}>
        ← Back
      </Link>

      <div className={styles.detail}>
        <Image
          src={`https://picsum.photos/seed/${storyId}/800/400`}
          alt={`${title} by ${by}`}
          width={800}
          height={400}
          className={styles.image}
          priority
        />

        <div className={styles.content}>
          <h1>{title}</h1>

          <div className={styles.metadata}>
            <div className={styles.item}>
              <strong>Score</strong>
              <span>{score} points</span>
            </div>
            <div className={styles.item}>
              <strong>Author</strong>
              <span>{by}</span>
            </div>
            <div className={styles.item}>
              <strong>Author Karma</strong>
              <span>{authorKarma?.toLocaleString()}</span>
            </div>
            <div className={styles.item}>
              <strong>Posted</strong>
              <span>{formatDate(time)}</span>
            </div>
          </div>

          {story.url && (
            <a href={story.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Read Full Article →
            </a>
          )}
        </div>
      </div>
    </>
  );
}
