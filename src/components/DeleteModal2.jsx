import axios from 'axios';
import React from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

const DeleteModal2 = ({open, toggle, editItem}) => {
    const deleteThatUser =()=> {
        axios.delete(`http://localhost:8000/blogs/${editItem.id}`).then((res)=> {
            if(res.status === 200) {
              window.location.reload()
            }
          })
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <h3>Are you sure you want to delete</h3>
            <h3 className='text-info'>{editItem.name} {editItem.surname}?</h3>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-warning' onClick={toggle}>cancel</button>
            <button className='btn btn-danger' onClick={deleteThatUser}>delete</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteModal2
