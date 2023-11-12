import React, { useEffect } from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
// import { Field, Form, Formik } from 'formik';
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
import { useLocation } from 'react-router-dom';
import parseParams from '../../utils/parseParams';
import { Button, Form, Input, Radio, Select, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Search from 'antd/es/input/Search';

type Props = {};

let Users: React.FC<Props> = (props) => {
  const totalUsers = useSelector(getTotalUsers);
  const pageSize = useSelector(getPageSize);
  const pageSelected = useSelector(getPageSelected);
  const usersItems = useSelector(getUsersItems);
  const isFollowingInProgress = useSelector(getIsFollowingInProgress);
  const filter = useSelector(getUsersFilter);

  const dispatch: AppDispatch = useDispatch();
  const location = useLocation(); // pathname = /users search = ?term=&friend=null&page=1

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

  useEffect(() => {
    //saving first render query string in redux and dispatching search
    let parsed = parseParams(location.search);
    let actualPage = pageSelected;
    let actualFilter = filter;

    if (!!parsed.page) {
      actualPage = +parsed.page;
    }
    if (!!parsed.term) {
      actualFilter = { ...actualFilter, term: parsed.term };
    }
    if (!!parsed.friend) {
      actualFilter = { ...actualFilter, friend: parsed.friend };
    }
    dispatch(getUsers(actualPage, pageSize, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //creating url for search when filter, pageSelected change
    const url = new URL(window.location.href);
    // window.history.replaceState(null, '', url.hash);   ?term=&friend=null&page=1
    let query = '?';
    if (!!filter.term) query += `term=${filter.term}`;
    if (filter.friend !== null) query += `&friend=${filter.friend}`;
    if (pageSelected !== 1) query += `&page=${pageSelected}`;
    if (query === '?') query = '';
    window.history.pushState(
      null,
      '',
      `${url.hash}${query}`, //${url.hash}?term=${filter.term}&friend=${filter.friend}&page=${pageSelected}
    );

    return () => {
      if (window.location.hash.includes('users')) {
        //if we are on page users
        window.history.replaceState(null, '', '#/users');
      }
    };
  }, [filter, pageSelected]);

  return (
    <div className={s.allUsers}>
      <UsersForm onFilterChanged={onFilterChanged} />
      <Paginator
        totalUsers={totalUsers}
        pageSize={pageSize}
        pageSelected={pageSelected}
        onPageChanged={onPageChanged}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        }}
      >
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

type FriendType = 'true' | 'false' | 'null';
type FormType = {
  term: string;
  friend: FriendType;
};

const UsersForm: React.FC<FormProps> = (props) => {
  const filter = useSelector(getUsersFilter);

  const submit = (
    values: any, //FormType
    // { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
    //это чтобы "false" привести к false
    console.log(values);
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
    // setSubmitting(false);
  };

  function handleSubmit(e: any) {
    // let obj = {
    //   email: formData.target[0].value,
    //   pass: formData.target[1].value,
    //   rememder: formData.target[2].checked,
    //   captcha: formData.captcha,
    // };
    console.log(e);
  }

  return (
    <>
      {/* <Formik
        enableReinitialize={true} //чтобы при изменении initialvalues, в поле формы отобращалось значение из поисковой строки
        initialValues={{
          term: filter.term,
          friend: String(filter.friend) as FriendType,
        }}
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
      </Formik> */}

      <Form
        // name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 1200, fontFamily: 'Montserrat' }}
        initialValues={{ friend: 'null' }}
        // autoComplete="off"
        layout="inline"
        // onSubmitCapture={handleSubmit}
        onFinish={submit}

        // onSubmit={props.handleSubmit}
      >
        <Form.Item name="friend">
          <Radio.Group>
            <Radio.Button value="null">
              <span style={{ color: 'black' }}>все</span>
            </Radio.Button>
            <Radio.Button value="true">
              <span style={{ color: 'black' }}>Подписчики</span>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Поиск
          </Button>
        </Form.Item> */}
        <Form.Item name="term">
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="Имя пользователя" />
            <Button type="primary" htmlType="submit">
              Поиск
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
    </>
  );
};

export default Users;
