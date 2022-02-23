import React, { Fragment } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd';
import { HomeOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';    
import {auth} from '../firebase'

const NavBar = (props) => {
    const navigate = useNavigate()
    const cerrarSesion = () => {
        auth.signOut().then(() => {
            navigate('/login')
        })
    }
  return (
    <Fragment>
        <Menu className="menu" theme="dark" mode="horizontal">
            <Menu.Item key="auth" icon={<AppstoreOutlined />}>
                <Link className='margin' to='/'>AUTH</Link>
            </Menu.Item>
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <NavLink to='/'></NavLink>
            </Menu.Item>
            {
                props.firebaseUser !== null ? 
                (
                    <Menu.Item key="mail" icon={<MailOutlined />}>
                        <NavLink className='margin' to='/admin'>Admin</NavLink>
                    </Menu.Item>
                ):null
                
            }
            
            {
                props.firebaseUser !== null ? 
                (<Button className='button-nav' onClick={() => cerrarSesion()}>Cerrar sección</Button>): (
                <Menu.Item key="user" icon={<UserOutlined />}>
                    <NavLink className='margin' to='/login'>Login</NavLink>
                </Menu.Item>)
            }
            
        </Menu>
    </Fragment>
  )
}

export default NavBar