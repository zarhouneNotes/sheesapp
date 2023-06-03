import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Modal , Button } from 'react-bootstrap';
import { RiCloseCircleLine } from 'react-icons/ri';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import Comment from './Coment';
// import Modal from '@mui/material/Modal';



export default function CommentsModal({open , setOpen}) {


  return (
    <div className=' px- comment-area position-absolute d-flex flex-column justify-content-between ' style={{scale : open ?   '0.5' : '0'}}>
        <div className='d-flex p-3 border-bottom  text- justify-content-between align-items-center'>
            <div>Comments</div>
            <IoMdClose fontSize='20px'  onClick={()=>setOpen(false)}   />
        </div>
        
        <div className=' com-area h-100'>
            <Comment />
            <Comment />

        </div>
      
            <Form className='d-flex align-items-center gap-1 px-2'>
                <input  placeholder='type your comment..' size='sm' className=' px-2 borde border- rounded-pll' />
                <div className="rounded-pll p-2 border bg-white">
                   <IoMdSend className='text-2'fontSize='25px' />
                </div>
                
            </Form>
        
    </div>
  );
}