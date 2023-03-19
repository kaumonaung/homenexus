import Image from 'next/image';

import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image src="/logo.svg" width="32" height="32" alt="HomeNexus" />
          HomeNexus
        </div>

        <h3>Your Weekly Home Office Planner</h3>
      </div>
    </>
  );
}
