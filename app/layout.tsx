import type { Metadata } from 'next';
import styles from './layout.module.scss';
import './globals.scss';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hacker News Explorer',
  description: 'Explore top stories from Hacker News',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <div className={styles.container}>
            <Link href="/">
              <h1>Hacker News Explorer</h1>
            </Link>
          </div>
        </header>
        <main className={styles.container}>{children}</main>
      </body>
    </html>
  );
}
