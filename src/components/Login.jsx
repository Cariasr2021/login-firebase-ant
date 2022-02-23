import React, { Fragment, useCallback, useState, useForm } from 'react'
import { Typography, Divider, Row, Col, Form, Input, Button, message, Alert} from 'antd';
import { auth, db } from '../firebase';
import { FormInstance } from 'antd/es/form';
import { useNavigate} from 'react-router-dom'

const { Title } = Typography;

const layout = {
    labelCol : { span: 8 },
    wrapperCol : { span: 24}
 }

const Login = () => {
    
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(true);
    const [form] = Form.useForm();

    
    const procesarDatos = (e) =>{
        e.preventDefault()
        if(!email.trim()){
            console.log('complete email')
            return
        }
        if(!pass.trim()){
            console.log('complete password')
            return
        }
        if(pass.length<6){
            console.log('mayor a 6 carácteres')
            return
        }
        if (esRegistro){
            registrar()  
        }else{
            login()
        }
        setError(null)
        
    }
    // const errorAlerta = () =>{
    //     message.error(error);
    // }

    const registrar = useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                id: res.user.uid
            })
            setEmail('')
            setPass('')
            navigate('/admin')
        } catch (error) {
             if(error.code === 'auth/email-already-in-use')
                 console.log('La dirección de correo electrónico ya está en uso por otra cuenta')
                 setError('La dirección de correo electrónico ya está en uso por otra cuenta')
        }
    }, [email, pass, navigate])

    const login = useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            navigate('/admin')
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/user-not-found'){
                console.log('La dirección de correo electrónico no se ha encontrado')
                setError('La dirección de correo electrónico no se ha encontrado')
            }
            if(error.code === 'auth/wrong-password'){
                console.log('La contraseña es incorrecta')
                setError('La contraseña es incorrecta')
            }
            
        }
    },[email, pass, navigate])
    

  return (
    <Fragment>
        <Title className='titulo-usuarios' >
            {
                esRegistro ? 'Registro de Usuarios': 'Login de Acceso'
            }
            </Title>
        <Divider className='border' />
        
        <div className='container-principal'>
            <Form
                {...layout}
                form={form}
                name='basic'
                onSubmitCapture={procesarDatos}
                
                
            >
                {
                error && (<Alert message={error} type="error" className='alerta-login' showIcon closable/>)
                }
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{required: true, type: 'email'}
                ]}
                >
                    <Input
                    placeholder='Ingrese un email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    
                    />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!'}, {min: 6, message: 'Mayor o igual a 6 carácteres'}]}
                >
                    <Input.Password
                    placeholder='Ingrese una contraseña'
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                    
                    />
                </Form.Item>
                <Form.Item
                    
                >   
                
                    <Button type="primary" htmlType="submit" block
                        
                    >
                        {
                            esRegistro ? 'Registrarse': 'Acceder'
                        }
                        
                    </Button>
                
                </Form.Item>
                <Form.Item
                    
                >
                    <Button type="danger" htmlType="button" onClick={() => setEsRegistro(!esRegistro)} block>
                        {
                            esRegistro ? '¿Ya tienes cuenta?': '¿No tienes cuenta?'
                        }
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
    </Fragment>
  )
}

export default Login