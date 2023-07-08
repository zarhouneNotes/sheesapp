import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ListItem from '../Profile/ListItem'
import UsersList from './UsersList'
import { chatIdGen, getUsers, sendMessage } from '../../RequMethods'

function ShareToList(props) {
    const {auth , url} = props
    const [list , setList] = useState([])
    const [OrList , setOrList] = useState([])
    const [msg , setMsg] = useState("")

    useEffect(()=>{
        getUsers(null).then((res)=>{
            setList(res?.users)
            setOrList(res.users)
        })
    },[])

    const message  = {
      isShee  : msg && msg.length >0 ? 'both' : true , 
      url : url,
      content : msg,
      time :Date.now(),
      sender : auth?.username

    }

    return (
        <Modal
        size=''
        {...props}
        
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title  id="contained-modal-title-vcenter">
            List of users
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input placeholder='write a message..' className='mb-2'  
          onChange={(e)=>{
            setMsg(e.target.value)         
          }}
           />

                {list?.map((poster)=>{
                    return  <div className="mb-2 d-flex align-items-center justify-content-between">
                                         
                                <div className='d-flex align-items-center link gap-1'   >
                                    <img width='40px' className='rounded-circle carre' src={`${process.env.REACT_APP_BASE_URL}/images/${poster?.pdp}`} alt="" srcset="" />
                                        <div>{poster?.username}</div>
                                </div>
                                <span size='sm' className='rounded-pi text-white px-2 py-1 bg-2' 
                                onClick={()=>{
                                  sendMessage(
                                    chatIdGen(auth?.username, poster?.username),
                                    [auth?.username, poster?.username] ,
                                    message
                                    
                                     )
                                    .then((res)=>{
                                      
                                    })}

                                  
                                  
                                }
                                >
                                  <small>send</small>
                                </span>
                          </div>
                })}
            
        </Modal.Body>
        <Modal.Footer>
            <Button  size='sm' variant='outline-dark' className='rounded-pill border px-4 '   onClick={props.onHide} >Back</Button>
        </Modal.Footer>
      </Modal>
      )
}

export default ShareToList