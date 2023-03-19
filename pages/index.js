import React, { useState, useEffect, memo } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/home.module.scss';
import initialData from '@/initial-data';

import Navbar from '@/components/Navbar';
import Column from '@/components/column';
import AddModal from '@/components/addModal';
import DeleteModal from '@/components/deleteModal';
import EditModal from '@/components/editModal';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const InnerList = memo((props) => {
  const {
    columnOrder,
    columns,
    tasks,
    addTask,
    setIsOpen,
    setColumnId,
    setTaskId,
    setOpenDelete,
    setOpenEdit,
    setItemText,
  } = props;

  return columnOrder.map((columnId, index) => {
    const column = columns[columnId];
    const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

    return (
      <Column
        key={column.id}
        column={column}
        tasks={columnTasks}
        index={index}
        addTask={addTask}
        setIsOpen={setIsOpen}
        setColumnId={setColumnId}
        setTaskId={setTaskId}
        setOpenDelete={setOpenDelete}
        setOpenEdit={setOpenEdit}
        setItemText={setItemText}
      />
    );
  });
});

export default function Home() {
  const [data, setData] = useState();
  const [columnId, setColumnId] = useState();
  const [taskId, setTaskId] = useState();

  const [openAdd, setOpenAdd] = useState(false);
  const [itemText, setItemText] = useState('');

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const data = localStorage.getItem('homeNexusData');
    if (data !== null && data !== undefined) {
      setData(JSON.parse(data));
    } else {
      setData(initialData);
    }
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // Do nothing if no destination is provided
    if (!destination) {
      return;
    }

    // Do nothing if the draggable is dropped in its original position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle column reordering
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData((prevData) => {
        const updatedData = {
          ...prevData,
          columnOrder: newColumnOrder,
        };
        localStorage.setItem('homeNexusData', JSON.stringify(updatedData));
        return updatedData;
      });

      return;
    }

    // Handle task reordering within a single column
    if (source.droppableId === destination.droppableId) {
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      setData((prevData) => {
        const updatedData = {
          ...prevData,
          columns: {
            ...prevData.columns,
            [newColumn.id]: newColumn,
          },
        };
        localStorage.setItem('homeNexusData', JSON.stringify(updatedData));
        return updatedData;
      });

      return;
    }

    // Handle task moving across columns
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData((prevData) => {
      const updatedData = {
        ...prevData,
        columns: {
          ...prevData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      localStorage.setItem('homeNexusData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const addTask = () => {
    if (!columnId || !itemText) return;

    // Create a new task object
    const newTask = {
      id: String('task-' + Math.floor(Math.random() * Date.now())), // generate a unique ID using a library like uuid
      content: itemText,
    };

    // Update the state to include the new task in the specified column
    setData((prevData) => {
      const newData = {
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [newTask.id]: newTask,
        },
        columns: {
          ...prevData.columns,
          [columnId]: {
            ...prevData.columns[columnId],
            taskIds: [...prevData.columns[columnId].taskIds, newTask.id],
          },
        },
      };
      localStorage.setItem('homeNexusData', JSON.stringify(newData));
      return newData;
    });
  };

  const editTask = () => {
    if (!taskId || !itemText) return;

    // Update the state to include the new task in the specified column
    setData((prevData) => {
      const newData = {
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: {
            ...prevData.tasks[taskId],
            content: itemText,
          },
        },
      };
      localStorage.setItem('homeNexusData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteTask = () => {
    if (!taskId) return;

    // Update the state to remove the task from the specified column
    setData((prevData) => {
      const newData = {
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: undefined,
        },
        columns: {
          ...prevData.columns,
          [columnId]: {
            ...prevData.columns[columnId],
            taskIds: prevData.columns[columnId].taskIds.filter(
              (id) => id !== taskId
            ),
          },
        },
      };
      localStorage.setItem('homeNexusData', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <>
      <Head>
        <title>HomeNexus</title>
        <meta name="description" content="Your home office planner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {data && (
        <main>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className={styles.container}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <InnerList
                    columnOrder={data.columnOrder}
                    columns={data.columns}
                    tasks={data.tasks}
                    addTask={addTask}
                    setIsOpen={setOpenAdd}
                    setColumnId={setColumnId}
                    setTaskId={setTaskId}
                    setOpenDelete={setOpenDelete}
                    setOpenEdit={setOpenEdit}
                    setItemText={setItemText}
                  />

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      )}

      <AddModal
        isOpen={openAdd}
        setIsOpen={setOpenAdd}
        itemText={itemText}
        setItemText={setItemText}
        addTask={addTask}
      />

      <DeleteModal
        isOpen={openDelete}
        setIsOpen={setOpenDelete}
        deleteTask={deleteTask}
      />

      <EditModal
        isOpen={openEdit}
        setIsOpen={setOpenEdit}
        itemText={itemText}
        setItemText={setItemText}
        editTask={editTask}
      />
    </>
  );
}
