import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          to="/profile"
          className={(navData) => (navData.isActive ? s.active : s.link)}
        >
          Профиль
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/dialogs"
          className={(navData) => (navData.isActive ? s.active : s.link)}
        >
          {/*это сделано, чтобы каждый раз не обновлялась страницу*/}
          Сообщения
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? s.active : s.link)}
        >
          {/*это сделано, чтобы каждый раз не обновлялась страницу*/}
          Друзья
        </NavLink>
      </div>
      <div className={s.item}>Сообщества</div>
    </nav>
  );
};

export default Navbar;
//  activeClassName={s.activeLink}className={s.link}
