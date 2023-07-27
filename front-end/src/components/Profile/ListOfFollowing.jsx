import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ListItem from './ListItem'

function ListOfFollowing(props) {
    const {list} = props

   
  return (
    <Modal
    size='sm'
    {...props}
    
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title  id="contained-modal-title-vcenter">
        Following
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {list?.length == 0 ?   
    <div>list is emtpy :(</div>
    :
    list?.map((item)=>{
        return <ListItem  key={item?.username} id={item?.username} />
    })
    }
    </Modal.Body>
    <Modal.Footer>
        <Button  size='sm' className='rounded-pill bg-2 px-4 '   onClick={props.onHide} >Back</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ListOfFollowing