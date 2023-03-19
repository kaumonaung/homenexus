const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'How to use this board' },
    'task-2': { id: 'task-2', content: 'Plan your week in home office' },
    'task-3': { id: 'task-3', content: 'Add, edit or delete tasks' },
    'task-4': { id: 'task-4', content: 'The data is cached in the browser' },
    'task-5': {
      id: 'task-5',
      content:
        'Create a "Weekly to Do" List, of tasks you wish to complete this week',
    },
    'task-6': { id: 'task-6', content: '💬 Plan your Monday here' },
    'task-7': { id: 'task-7', content: '💬 Plan your Tuesday here' },
    'task-8': { id: 'task-8', content: '💬 Plan your Wednesday here' },
    'task-9': { id: 'task-9', content: '💬 Plan your Thursday here' },
    'task-10': { id: 'task-10', content: '💬 Plan your Friday here' },
    'task-11': {
      id: 'task-11',
      content: "✨ Be proud! You're done! For all your finished tasks.",
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Info',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'To-Do This Week',
      taskIds: ['task-5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Monday',
      taskIds: ['task-6'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Tuesday',
      taskIds: ['task-7'],
    },
    'column-5': {
      id: 'column-5',
      title: 'Wednesday',
      taskIds: ['task-8'],
    },
    'column-6': {
      id: 'column-6',
      title: 'Thursday',
      taskIds: ['task-9'],
    },
    'column-7': {
      id: 'column-7',
      title: 'Friday',
      taskIds: ['task-10'],
    },
    'column-8': {
      id: 'column-8',
      title: 'Completed Task 🎉',
      taskIds: ['task-11'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5',
    'column-6',
    'column-7',
    'column-8',
  ],
};

export default initialData;
