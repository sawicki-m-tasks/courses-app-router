export const mockedStateWithUsername = {
  user: {
    isAuth: true,
    name: 'karolek',
  },
  courses: [],
  authors: [],
};

export const mockedStoreWithUsername = {
  getState: () => mockedStateWithUsername,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export const mockedStateWithoutUsername = {
  user: {
    isAuth: true,
    name: '',
    email: 'karolek@karolek.com',
  },
  courses: [],
  authors: [],
};

export const mockedStoreWithoutUsername = {
  getState: () => mockedStateWithoutUsername,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export const mockedStateCourses = {
  user: {
    isAuth: true,
    name: 'karolek',
    role: 'admin',
  },
  courses: [
    {
      title: 'new title',
      description: 'description',
      creationDate: '9/3/2021',
      duration: 30,
      authors: [
        '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
      ],
      id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
    },
  ],
  authors: [
    {
      name: 'author',
      id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
    },
    {
      name: 'author2',
      id: '1c972c52-3198-4098-b6f7-799b45903199',
    },
    {
      name: 'author3',
      id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
    },
    {
      name: 'author4',
      id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
    },
    {
      name: 'author5',
      id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
    },
    {
      name: 'author6',
      id: '9987de6a-b475-484a-b885-622b8fb88bda',
    },
  ],
};

export const mockedStoreCourses = {
  getState: () => mockedStateCourses,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export const mockedStateNoCourses = {
  user: {},
  courses: [],
  authors: [],
};

export const mockedStoreNoCourses = {
  getState: () => mockedStateNoCourses,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export const mockedStateUserNotAdmin = {
  user: {
    isAuth: true,
    name: 'karolek',
    role: '',
  },
  courses: [],
  authors: [],
};

export const mockedStoreUserNotAdmin = {
  getState: () => mockedStateUserNotAdmin,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export const mockedStateUserAdmin = {
  user: {
    isAuth: true,
    name: 'benio',
    role: 'admin',
  },
  courses: [],
  authors: [],
};

export const mockedStoreUserAdmin = {
  getState: () => mockedStateUserAdmin,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};
