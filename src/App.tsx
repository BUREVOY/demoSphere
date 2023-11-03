import './App.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  HashRouter,
  Navigate,
  Link,
} from 'react-router-dom';

import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

import React, { Suspense } from 'react';
import { compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Loader from './components/common/Loader/Loader';
import store, { AppStateType } from './redux/reduxStore';
import NotFound from './components/errorPages/NotFound';
import { Breadcrumb, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import HeaderApp from './components/Header/HeaderApp';

const { Content, Sider } = Layout;
// import Login from "./components/Login/Login";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
let DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer'),
);
let Login = React.lazy(() => import('./components/Login/Login'));
let ChatPage = React.lazy(() => import('./Pages/Chat/Chat'));

type MapProps = ReturnType<typeof mapStateToProps>;
type DispProps = {
  initializeApp: () => void;
};

class App extends React.Component<MapProps & DispProps> {
  handleRejections = (rejectEvent: PromiseRejectionEvent) => {
    console.error(`because of ${rejectEvent} problems happened`);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.handleRejections);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleRejections);
  }
  handleclick(e: any) {
    localStorage.setItem('selectedMenuItem', e.key);
  }

  render() {
    let selectedKey = localStorage.getItem('selectedMenuItem') || '1';

    if (!this.props.initialized) {
      <Loader />;
    } else {
      return (
        //   <Navbar />

        <div className="App">
          <Layout>
            <HeaderApp />
            <Layout>
              <Sider
                width={200}
                style={{ background: '#1D1D1D', padding: '12px 6px 6px 12px' }}
              >
                {
                  //colorBgContainer
                }
                {/* <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                  items={items2}
                /> */}
                <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
                  {/*defaultSelectedKeys={['1']}*/}
                  <Menu.Item
                    key="1"
                    icon={<UserOutlined />}
                    onClick={this.handleclick}
                  >
                    <Link to="/profile">Профиль</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<UserOutlined />}
                    onClick={this.handleclick}
                  >
                    <Link to="/dialogs">Сообщения</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<UserOutlined />}
                    onClick={this.handleclick}
                  >
                    <Link to="/users">Пользователи</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    icon={<UserOutlined />}
                    onClick={this.handleclick}
                  >
                    <Link to="/chat">Чат</Link>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px', background: '#1D1D1D' }}>
                <Breadcrumb style={{ margin: '16px 0', color: 'aliceblue' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    padding: 12,
                    margin: 0,
                    minHeight: 280,
                    background: '#1D1D1D',
                  }}
                >
                  <Suspense fallback={<Loader />}>
                    <Routes>
                      {/* <Route path="/" element={<ProfileContainer />} /> */}
                      <Route path="/" element={<Navigate to="/profile" />} />
                      <Route
                        path="/profile/:userId?"
                        element={<ProfileContainer />}
                      />
                      {/*для нестрогой записи, используется "*" в пути. поведение по умолчанию = exact  */}
                      <Route path="/dialogs/*" element={<DialogsContainer />} />
                      <Route path="/users/*" element={<UsersContainer />} />
                      <Route path="/login/*" element={<Login />} />
                      <Route path="/chat/" element={<ChatPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      );
    }
  }
}

function withRouter(Component: React.ComponentType) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

let mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter,
)(App);

const MainApp: React.FC = () => {
  return (
    // <React.StrictMode>
    // basename ="/"
    //{process.env.PUBLIC_URL}
    <Provider store={store}>
      <HashRouter basename="/">
        <AppContainer />
      </HashRouter>
    </Provider>
    // </React.StrictMode>
  );
};

export default MainApp;
