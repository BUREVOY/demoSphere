import { UsersAPI } from '../../api/users-api';
import { ResponseType, ResultCodes } from '../../api/api';
import { actions, followAPI, unfollowAPI } from '../../redux/userReducer';

jest.mock('../../api/users-api');
const UsersAPImock = UsersAPI as jest.Mocked<typeof UsersAPI>;

const result: ResponseType = {
  resultCode: ResultCodes.Success,
  messages: [],
  data: {},
};

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

test('follow_THUNK', async () => {
  UsersAPImock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = followAPI(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleIsFollowing(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleIsFollowing(false, 1),
  );
});
test('unfollow_THUNK', async () => {
  UsersAPImock.unfollow.mockReturnValue(Promise.resolve(result));
  const thunk = unfollowAPI(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleIsFollowing(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleIsFollowing(false, 1),
  );
});
