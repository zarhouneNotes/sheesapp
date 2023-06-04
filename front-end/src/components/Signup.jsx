import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';

// import axios from 'axios'

function Signup() {
  const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [err , setErr] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
  
  const url = "http://localhost:3001/signup" 
  
   async  function  handleSubmit (event)  {
      event.preventDefault();

    const res =await   fetch(`${process.env.REACT_APP_BASE_URL}/signup` ,  {    

        headers: {
          'Content-Type': 'application/json',
        },
        method  : 'POST' , 
        body:JSON.stringify({
          followers : [] , 
          following : [] ,
          fullname : fullname ,
          email : email,
          password : password,
          username : username
        
      }) 
      })
          
          const data = await res.json()
          data.status === 'err' ? setErr(data.message) : navigate('/login')
          
    

    }
  
    return (
    <div className="form-container">
      <div className="login-page  bg-priary">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-in">
            <img width="200px" src={logo} alt="" srcset="" />
          </div>
          { err && <Alert   variant="danger">{ err }</Alert>}
          <div className="form-group mb-3">
            <input
            placeholder='fullname..'
              type="text"
              id="fullname" 
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
            placeholder='Email..'
              type="email"
              id="email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              placeholder='username..'
              type="text"
              id="name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              placeholder='Password..'
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          
          <Button className='bg-2 w-100 ' type="submit">Sign Up</Button>
          <Form.Text>you already have an account ? <Link to={'/login'}> <u>Log In!</u></Link></Form.Text>
          
        </form>
      </div>
      </div>
    );
}

export default Signup