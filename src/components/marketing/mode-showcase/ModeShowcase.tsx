import { homeContent } from '@/data/home';
import { ModeShowcaseClient } from './ModeShowcaseClient';
import styles from './ModeShowcase.module.css';

export function ModeShowcase() {
  const { modes } = homeContent;

  return (
    <section id="modes" className={styles.section} aria-labelledby="modes-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{modes.eyebrow}</p>
        <h2 id="modes-title" className={styles.title}>
          {modes.title}
        </h2>
        <p className={styles.description}>{modes.subtitle}</p>
      </div>

      <ModeShowcaseClient modes={modes.items} />
    </section>
  );
}
