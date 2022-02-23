import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import {useNavigate} from 'react-router-dom'
import { Fragment } from 'react/cjs/react.production.min';

const Admin = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.currentUser){
            console.log('existe un usuario')
            setUser(auth.currentUser)
        }else{
            console.log('no existe el usuario')
            navigate('/login')
        }
    }, [])
  return (
    <Fragment>
        <h2>Admin...</h2>
    </Fragment>
  )
}

export default Admin