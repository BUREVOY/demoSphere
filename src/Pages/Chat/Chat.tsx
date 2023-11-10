import React, { useEffect, useRef, useState } from 'react';
import s from './Chat.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendNewMessage,
  startListeningNewMessages,
  stopListeningNewMessages,
} from '../../redux/chatReducer';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, Input, Space } from 'antd';
import { getisAuth } from '../../redux/authSelector';
const defaultUser = require('../../assets/images/defautltUser.png');
// /*
// let wsChannel = new WebSocket(
//   'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
// );
// wsChannel.onmessage = (e) => {
//   console.log(e);
// };
// */

export type ChatType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  let dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(startListeningNewMessages());
    return () => {
      dispatch(stopListeningNewMessages());
    };
  }, [dispatch]);

  const isAuth = useSelector(getisAuth);
  if (!isAuth) return <Navigate to={'/login'} />;
  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  );
};
///////////////////////// AddMessageForm //////////////////////////
const AddMessageForm: React.FC = () => {
  let [message, setMessage] = useState('');
  // let [ready, setReady] = useState<'pending' | 'ready'>('pending');

  let dispatch: AppDispatch = useDispatch();

  let status = useSelector((state: AppStateType) => state.chat.status);

  let sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendNewMessage(message));
    setMessage('');
  };

  return (
    <>
      {/* <textarea
        name="chatArea"
        id="t"
        cols={30}
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      ></textarea>
      <button
        disabled={status === 'pending' || !navigator.onLine}
        onClick={sendMessageHandler}
      >
        Отправить
      </button> */}
      <div style={{ maxWidth: '700px' }}>
        <Space.Compact
          style={{ width: '100%', padding: '8px 8px 8px 0 ', margin: '4px' }}
        >
          <Input
            defaultValue=""
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
          <Button
            type="primary"
            disabled={status === 'pending' || !navigator.onLine}
            onClick={sendMessageHandler}
          >
            ОТПРАВИТЬ
          </Button>
        </Space.Compact>
      </div>
    </>
  );
};
////////////////////////// MessageS //////////////////////////////////
const Messages: React.FC = () => {
  // TODO: Remove useEffect and useState
  let messages = useSelector((state: AppStateType) => state.chat.messages);

  let lastDiv = useRef<HTMLDivElement>(null);

  let [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

  let scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget;

    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight,
      ) < 300
    ) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      lastDiv.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, isAutoScroll]);

  // let [a, setA] = useState<number>(10);

  // let aHandler = () => {
  //   setA((a) => a + 1);
  //   setA((a) => a + 1);
  // };

  return (
    <div
      style={{ overflow: 'auto', maxHeight: '700px', maxWidth: '700px' }}
      onScroll={scrollHandler}
      className={s.messages}
    >
      {/* <div onClick={aHandler} style={{ fontSize: '30px' }}>
        {a}
      </div> */}
      {messages.map((m, i) => (
        <Message key={i} message={m} />
      ))}
      <div ref={lastDiv}></div>
    </div>
  );
};
/////////////////////////////// Message /////////////////////////////////////////////////
const Message: React.FC<{ message: ChatType }> = React.memo(({ message }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          color: 'aliceblue',
          background: '#212121',
          padding: '8px',
          margin: '4px',
          borderRadius: '16px',
        }}
      >
        <div>
          <NavLink to={'/profile/' + message.userId}>
            <img
              src={message.photo || defaultUser}
              style={{ borderRadius: '50%' }}
              alt="avatar"
              height="50px"
              width="50px"
            />
          </NavLink>
        </div>

        <div
          style={{
            alignSelf: 'center',
            marginLeft: '10px',
            fontFamily: 'Montserrat',
          }}
        >
          {message.message}
        </div>
      </div>
    </>
  );
});

export default ChatPage;
