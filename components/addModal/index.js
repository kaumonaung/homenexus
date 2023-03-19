import styles from './addModal.module.scss';

export default function AddModal({
  isOpen,
  setIsOpen,
  itemText,
  setItemText,
  addTask,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div>
            <label htmlFor="item" className={styles.label}>
              Create a new task
            </label>
            <div>
              <textarea
                rows={4}
                name="item"
                id="item"
                className={styles.textarea}
                defaultValue={itemText}
                placeholder="Enter your task here..."
                onChange={(e) => setItemText(e.target.value)}
              />
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
                  addTask();
                  setIsOpen(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
