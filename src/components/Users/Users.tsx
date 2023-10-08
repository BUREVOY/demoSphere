import React, { useEffect } from 'react';
import s from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import { Field, Form, Formik } from 'formik';
import {
  FilterType,
  getUsers,
  unfollowAPI,
  followAPI,
} from '../../redux/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsFollowingInProgress,
  getPageSelected,
  getPageSize,
  getTotalUsers,
  getUsersFilter,
  getUsersItems,
} from '../../redux/userSelector';
import { AppDispatch } from '../../redux/reduxStore';
import { AnyAction } from 'redux';

type Props = {};

let Users: React.FC<Props> = (props) => {
  const totalUsers = useSelector(getTotalUsers);
  const pageSize = useSelector(getPageSize);
  const pageSelected = useSelector(getPageSelected);
  const usersItems = useSelector(getUsersItems);
  const isFollowingInProgress = useSelector(getIsFollowingInProgress);
  const filter = useSelector(getUsersFilter);

  const dispatch: AppDispatch = useDispatch();

  const onPageChanged = (p: number) => {
    dispatch(getUsers(p, pageSize, filter)); //as unknown as AnyAction
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollowAPI(userId) as unknown as AnyAction);
  };
  const follow = (userId: number) => {
    dispatch(followAPI(userId) as unknown as AnyAction);
  };

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   // window.history.replaceState(null, '', url.hash);
  //   window.history.pushState(
  //     null,
  //     '',
  //     `${url.hash}?term=${filter.term}&friend=${filter.friend}&page=${pageSelected}`,
  //   );

  //   return () => {
  //     window.history.replaceState(null, '', url.hash);
  //   };
  // }, [filter, pageSelected]);

  useEffect(() => {
    dispatch(getUsers(pageSelected, pageSize, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.allUsers}>
      <UsersForm onFilterChanged={onFilterChanged} />
      <Paginator
        totalUsers={totalUsers}
        pageSize={pageSize}
        pageSelected={pageSelected}
        onPageChanged={onPageChanged}
      />
      <div className={s.item}>привеет жестокий мир</div>
      {usersItems.map((item) => (
        <User
          key={item.id}
          item={item}
          isFollowingInProgress={isFollowingInProgress}
          unfollow={unfollow}
          follow={follow}
        />
      ))}
    </div>
  );
};

const usersFormValidation = (values: any) => {
  const errors = {};
  return errors;
};

type FormProps = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string;
  friend: 'true' | 'false' | 'null';
};

const UsersForm: React.FC<FormProps> = (props) => {
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
    //это чтобы "false" привести к false
    const filter = {
      term: values.term,
      friend:
        values.friend === 'null'
          ? null
          : values.friend === 'false'
          ? false
          : true,
    };

    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ term: '', friend: 'null' as const }}
        validate={usersFormValidation}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">Все</option>
              <option value="true">Подписчики</option>
              <option value="false">Не подписчики</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Поиск
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Users;
