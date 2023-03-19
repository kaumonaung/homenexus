import React, { memo } from 'react';
import styles from './column.module.scss';
import Task from '@/components/task';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusIcon } from '@heroicons/react/24/outline';

const InnerList = memo(
  ({
    tasks,
    setTaskId,
    setOpenDelete,
    columnId,
    setColumnId,
    setOpenEdit,
    setItemText,
  }) => {
    return tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        setTaskId={setTaskId}
        setOpenDelete={setOpenDelete}
        columnId={columnId}
        setColumnId={setColumnId}
        setOpenEdit={setOpenEdit}
        setItemText={setItemText}
      />
    ));
  }
);

export default function Column({
  column,
  tasks,
  index,
  setIsOpen,
  setColumnId,
  setTaskId,
  setOpenDelete,
  setOpenEdit,
  setItemText,
}) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className={styles.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3 className={styles.title}>{column.title}</h3>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={styles.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <InnerList
                  tasks={tasks}
                  setTaskId={setTaskId}
                  setOpenDelete={setOpenDelete}
                  columnId={column.id}
                  setColumnId={setColumnId}
                  setOpenEdit={setOpenEdit}
                  setItemText={setItemText}
                />
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setColumnId(column.id);
                  }}
                  className={styles.addTaskButton}
                >
                  <PlusIcon className={styles.plusIcon} />
                  Add task
                </button>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
