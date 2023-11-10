let subscribers = [] as SubscribeType[];

let ws: WebSocket | null = null;

let closeHandler = () => {
  console.log('close');
  setTimeout(createWS, 3000);
};

function messageHandler(e: MessageEvent) {
  let newMessages = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessages));
}

function createWS() {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.close();

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );

  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
}

export const ChatAPI = {
  start() {
    createWS();
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.close();
  },
  subscribe(callback: SubscribeType) {
    subscribers.push(callback);

    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe(callback: SubscribeType) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

export type SubscribeType = (messages: ChatType[]) => void;

export type ChatType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};
