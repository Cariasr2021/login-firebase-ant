import React, { Fragment, useState } from 'react'
import { Typography, Divider, Row, Col, Form, Input, Button, Checkbox } from 'antd';

const { Title } = Typography;

const layout = {
    labelCol : { span: 8 },
    wrapperCol : { span: 24}
 }

const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

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
    }

  return (
    <Fragment>
        <Title className='titulo-usuarios' >Registro de usuarios</Title>
        <Divider className='border' />
        
        <div className='container-principal'>
            <Form
                {...layout}
                name='basic'
                onSubmitCapture={procesarDatos}
                autoComplete='off'
            >
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{required: true, type: 'email'}]}
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
                    <Button type="primary" htmlType="submit" block>
                        Registrarse
                    </Button>
                </Form.Item>
                <Form.Item
                    
                >
                    <Button type="danger" htmlType="submit" block>
                        ¿Ya tienes cuenta?
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
    </Fragment>
  )
}

export default Login