import React from 'react';
import { Link } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const Navbar: React.FC = () => {
  let selectedKey = localStorage.getItem('selectedMenuItem') || '1';

  function handleclick(e: any) {
    localStorage.setItem('selectedMenuItem', e.key);
  }
  return (
    <Sider
      width={220}
      style={{
        background: '#1D1D1D',
        padding: '12px 6px 6px 12px',
      }}
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
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ padding: '8px', borderRadius: '16px', background: '#212121' }}
      >
        {/*defaultSelectedKeys={['1']}*/}
        <Menu.Item
          key="1"
          icon={<UserOutlined />}
          onClick={handleclick}
          style={{ fontFamily: 'Montserrat' }}
        >
          <Link to="/profile">Профиль</Link>
        </Menu.Item>
        {/* <Menu.Item
          key="2"
          icon={<UnorderedListOutlined />}
          onClick={handleclick}
          style={{ fontFamily: 'Montserrat' }}
        >
          <Link to="/dialogs">Сообщения</Link>
        </Menu.Item> */}
        <Menu.Item
          key="3"
          icon={<UsergroupAddOutlined />}
          onClick={handleclick}
          style={{ fontFamily: 'Montserrat' }}
        >
          <Link to="/users">Пользователи</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<MessageOutlined />}
          onClick={handleclick}
          style={{ fontFamily: 'Montserrat' }}
        >
          <Link to="/chat">Чат</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
//className={(navData) => (navData.isActive ? s.active : s.link)}
export default Navbar;
//  activeClassName={s.activeLink}className={s.link}
