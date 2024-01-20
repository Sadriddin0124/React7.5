import axios from 'axios'
import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const AddUserModal = ({open, toggle, editItem, setEditItem}) => {
    const addUser =(e)=> {
        e.preventDefault()
        let name = e.target[0].value
        let surname = e.target[1].value
        let phone = +e.target[2].value
        let count = +e.target[3].value
        let payload = {
            name,
            surname,
            phone,
            count,
            active: false
        }
        if(editItem.id !== undefined) {
            axios.put(`http://localhost:8000/blogs/${editItem.id}`, {...payload}).then((res)=> {
                if(res.status === 200) {
                    window.location.reload()
                    setEditItem('')
                }
            })
            
        }else {
            console.log(payload);
            axios.post(`http://localhost:8000/blogs`, {...payload}).then((res)=> {
                if(res.status === 201) {
                    window.location.reload()
                }
            })
        }
    }
    
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>
            <h1>Add User</h1>
        </ModalHeader>
        <ModalBody>
            <form onSubmit={addUser} id='users'>
                <input type="text" className='form-control' placeholder="name" defaultValue={editItem.name}/>
                <input type="text" className='form-control my-2' placeholder="surname" defaultValue={editItem.surname}/>
                <input type="number" className='form-control' placeholder="phone" defaultValue={editItem.phone}/>
                <input type="number" className='form-control' placeholder="count" defaultValue={editItem.count}/>
            </form>
        </ModalBody>
        <ModalFooter>
            <button type='submit' form='users' className="btn btn-primary">Save</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AddUserModal
