import React, { useEffect, useState } from 'react'
import {Alert, Button, Form} from 'react-bootstrap'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err , setErr] = useState('')
    const navigate = useNavigate()
  useEffect(()=>{
    
    if(localStorage.getItem('auth') ) {
      // console.log(localStorage.getItem('auth'))
      navigate(`/`)
  }
  },[])
    async function  handleSubmit  (event) {
      event.preventDefault()
       const res = await  fetch(`${process.env.REACT_APP_BASE_URL}/login` , {
        method : 'POST' ,
        headers : {
          'Content-Type': 'application/json',
        } ,
        body : JSON.stringify({
          email   : email,
          password : password
        })  
      })
      const data =  await res.json()
      console.log(data)
    if ( data.status === 'err') { setErr(data.message) }
    if(data.status === 'ok')  {localStorage.setItem('auth' , JSON.stringify(data.info)) ;  navigate(`/`)}
      
    }
  
    return (
    <div className="form-container ">
      <div className="login-page  px-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-in">
            <img width="200px" src={logo} alt="" srcset="" />
          </div>
          { err && <Alert   variant="danger">{ err }</Alert>}
          <div className="form-group mb-3">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button className='bg-2 w-100 ' type="submit">Log In</Button>
          <Form.Text>you don't have an account ?<Link to={'/signup'}> <u>Sign up!</u></Link></Form.Text>
        </form>
      </div>
      </div>
    );
}

export default Login