import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Story Not Found</h2>
        <p className={styles.description}>
          {`The story you're looking for doesn't exist or has been removed.`}
        </p>
        <Link href="/" className={styles.button}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
