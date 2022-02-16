import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';    

const NavBar = () => {
  return (
    <Fragment>
        <Menu className="menu" theme="dark" mode="horizontal">
            <Menu.Item key="auth" icon={<AppstoreOutlined />}>
                <Link className='margin' to='/'>AUTH</Link>
            </Menu.Item>
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <NavLink to='/'></NavLink>
            </Menu.Item>
            <Menu.Item key="user" icon={<UserOutlined />}>
                <NavLink className='margin' to='/login'>Login</NavLink>
            </Menu.Item>
            <Menu.Item key="mail" icon={<MailOutlined />}>
                <NavLink className='margin' to='/admin'>Admin</NavLink>
            </Menu.Item>
            
        </Menu>
    </Fragment>
  )
}

export default NavBar