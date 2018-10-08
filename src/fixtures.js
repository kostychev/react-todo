export default [
  {
    id: 1,
    title: 'Элемент списка 1',
    completed: false,
    sublist: null,
  },
  {
    id: 2,
    title: 'Элемент списка 2',
    completed: false,
    sublist: [
      {
        id: 3,
        title: 'Элемент списка 2.1',
        completed: false,
        sublist: [
          {
            id: 4,
            title: 'Элемент списка 2.1.1',
            completed: false,
            sublist: [],
          }],
      },
    ],
  },
];