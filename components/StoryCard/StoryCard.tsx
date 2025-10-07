import Link from 'next/link';
import Image from 'next/image';
import { HackerNewsStory } from '@/types';
import { formatTime } from '@/lib/utils';

import styles from './StoryCard.module.scss';

interface StoryCardProps {
  story: HackerNewsStory;
}

export default function StoryCard({ story }: StoryCardProps) {
  const { id, title, by, score, time, authorKarma } = story;

  return (
    <div className={styles.card}>
      <Link href={`/story/${id}`}>
        <Image
          src={`https://picsum.photos/seed/${id}/400/300`}
          alt={`${title} by ${by}`}
          width={400}
          height={300}
        />
        <div className={styles.content}>
          <h2>{title}</h2>
          <div className={styles.metadata}>
            <div>
              <span className={styles.highlight}>{score} points</span>
            </div>
            <div>by {by}</div>
            <div>{authorKarma?.toLocaleString()} karma</div>
            <div>{formatTime(time)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
