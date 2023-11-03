import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendNewMessage,
  startListeningNewMessages,
  stopListeningNewMessages,
} from '../../redux/chatReducer';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
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

// const ChatPage: React.FC = () => {
//   let [ws, setws] = useState<null | WebSocket>(null);

//   useEffect(() => {
//     let ws: WebSocket;
//     let closeHandler = () => {
//       console.log('close');
//       setTimeout(createWS, 3000);
//     };
//     function createWS() {
//       ws?.removeEventListener('close', closeHandler);
//       ws?.close();

//       ws = new WebSocket(
//         'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
//       );

//       ws.addEventListener('close', closeHandler);

//       setws(ws);
//     }
//     createWS();

//     return () => {
//       ws.removeEventListener('close', closeHandler);
//       ws.close();
//     };
//   }, []);

//   return (
//     <>
//       <Messages ws={ws} />
//       <AddMessageForm ws={ws} />
//     </>
//   );
// };
// const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
//   let [message, setMessage] = useState('');
//   let [ready, setReady] = useState<'pending' | 'ready'>('pending');

//   useEffect(() => {
//     function openHandler() {
//       setReady('ready');
//     }

//     ws?.addEventListener('open', openHandler);

//     return () => {
//       ws?.removeEventListener('open', openHandler);
//     };
//   }, [ws]);

//   let sendMessage = () => {
//     if (!message) {
//       return;
//     }
//     ws?.send(message);
//     setMessage('');
//   };
//   return (
//     <>
//       <textarea
//         name="chatArea"
//         id="t"
//         cols={30}
//         rows={2}
//         value={message}
//         onChange={(e) => setMessage(e.currentTarget.value)}
//       ></textarea>
//       <button disabled={ready !== 'ready' || ws === null} onClick={sendMessage}>
//         Отправить
//       </button>
//     </>
//   );
// };
// const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
//   let [messages, setMessages] = useState<ChatType[]>([]);

//   function messageHandler(e: MessageEvent) {
//     // console.log(e);
//     setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)]);
//   }

//   useEffect(() => {
//     console.log('render', typeof ws);
//     ws?.addEventListener('message', messageHandler);
//     return () => {
//       ws?.removeEventListener('message', messageHandler);
//     };
//   }, [ws]);

//   return (
//     <>
//       {messages.map((m, i) => (
//         <Message key={i} message={m} />
//       ))}
//     </>
//   );
// };
// const Message: React.FC<{ message: ChatType }> = ({ message }) => {
//   return (
//     <div style={{ color: 'aliceblue' }}>
//       <img
//         src={message.photo || defaultUser}
//         alt="avatar"
//         height="50px"
//         width="50px"
//       />
//       <b>{message.userName}</b>
//       <br />
//       {message.message}
//       <hr />
//     </div>
//   );
// };

const ChatPage: React.FC = () => {
  let dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(startListeningNewMessages());
    return () => {
      dispatch(stopListeningNewMessages());
    };
  }, []);

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
      <textarea
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
      </button>
    </>
  );
};
////////////////////////// MessageS //////////////////////////////////
const Messages: React.FC = () => {
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

  return (
    <div
      style={{ overflow: 'auto', maxHeight: '500px' }}
      onScroll={scrollHandler}
    >
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
    <div style={{ color: 'aliceblue' }}>
      <img
        src={message.photo || defaultUser}
        alt="avatar"
        height="50px"
        width="50px"
      />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
});
export default ChatPage;
