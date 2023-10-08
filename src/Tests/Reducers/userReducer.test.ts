import userReducer, {
  actions,
  initialStateType,
} from '../../redux/userReducer';

let state: initialStateType = {
  usersItems: [
    {
      id: 0,
      name: 'Ars1',
      followed: false,
      photos: {
        small: undefined,
        large: undefined,
      },
      status: 'STATUS ARS1',
    },
    {
      id: 1,
      name: 'Ars2',
      followed: false,
      photos: {
        small: undefined,
        large: undefined,
      },
      status: 'STATUS ARS2',
    },
    {
      id: 2,
      name: 'Ars3',
      followed: true,
      photos: {
        small: undefined,
        large: undefined,
      },
      status: 'STATUS ARS3',
    },
    {
      id: 3,
      name: 'Ars4',
      followed: true,
      photos: {
        small: undefined,
        large: undefined,
      },
      status: 'STATUS ARS4',
    },
  ],
  totalUsers: 19,
  pageSize: 4,
  pageSelected: 1,
  isFetching: false,
  filter: {
    term: '',
    friend: null as null | boolean,
  },
  isFollowingInProgress: [],
};
//before execution of everey test, our state will be reset.
beforeEach(() => {
  state = {
    usersItems: [
      {
        id: 0,
        name: 'Ars1',
        followed: false,
        photos: {
          small: undefined,
          large: undefined,
        },
        status: 'STATUS ARS1',
      },
      {
        id: 1,
        name: 'Ars2',
        followed: false,
        photos: {
          small: undefined,
          large: undefined,
        },
        status: 'STATUS ARS2',
      },
      {
        id: 2,
        name: 'Ars3',
        followed: true,
        photos: {
          small: undefined,
          large: undefined,
        },
        status: 'STATUS ARS3',
      },
      {
        id: 3,
        name: 'Ars4',
        followed: true,
        photos: {
          small: undefined,
          large: undefined,
        },
        status: 'STATUS ARS4',
      },
    ],
    totalUsers: 19,
    pageSize: 4,
    pageSelected: 1,
    isFetching: false,
    filter: {
      term: '',
      friend: null as null | boolean,
    },
    isFollowingInProgress: [],
  };
});

test('userReducer_follow', () => {
  const NewState = userReducer(state, actions.follow(1));

  expect(NewState.usersItems[0].followed).toBeFalsy();
  expect(NewState.usersItems[1].followed).toBeTruthy();
});
test('userReducer_unfollow', () => {
  const NewState = userReducer(state, actions.unfollow(3));

  expect(NewState.usersItems[1].followed).toBeFalsy();
  expect(NewState.usersItems[2].followed).toBeTruthy();
  expect(NewState.usersItems[3].followed).toBeFalsy();
});
