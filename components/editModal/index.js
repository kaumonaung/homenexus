import styles from './editModal.module.scss';

export default function AddModal({
  isOpen,
  setIsOpen,
  itemText,
  setItemText,
  editTask,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={() => {
        setItemText('');
        setIsOpen(false);
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div>
            <label htmlFor="item" className={styles.label}>
              Task
            </label>
            <div>
              <textarea
                rows={4}
                name="item"
                id="item"
                className={styles.textarea}
                defaultValue={itemText}
                onChange={(e) => setItemText(e.target.value)}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  setItemText('');
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.confirm}
                onClick={() => {
                  editTask();
                  setIsOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
