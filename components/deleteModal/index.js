import styles from './deleteModal.module.scss';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function DeleteModal({ isOpen, setIsOpen, deleteTask }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div className={styles.iconContainer}>
            <ExclamationTriangleIcon
              className={styles.icon}
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className={styles.title}>Delete Task</h3>
            <p className={styles.content}>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.confirm}
              onClick={() => {
                deleteTask();
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
