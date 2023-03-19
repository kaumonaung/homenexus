import styles from './task.module.scss';
import { Draggable } from '@hello-pangea/dnd';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function Task({
  task,
  index,
  setTaskId,
  setOpenDelete,
  setColumnId,
  columnId,
  setOpenEdit,
  setItemText,
}) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          {task.content}

          <div className={styles.iconContainer}>
            <PencilIcon
              className={styles.editIcon}
              onClick={() => {
                setTaskId(task.id);
                setColumnId(columnId);
                setOpenEdit(true);
                setItemText(task.content);
              }}
            />
            <TrashIcon
              className={styles.deleteIcon}
              onClick={() => {
                setTaskId(task.id);
                setColumnId(columnId);
                setOpenDelete(true);
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
