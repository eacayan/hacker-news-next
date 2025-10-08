import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
