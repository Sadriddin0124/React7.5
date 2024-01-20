import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import DeleteModal2 from "./DeleteModal2";
const Users = () => {
    const [blogs, setBlogs] = useState([]);
  const [modal, setModal] = useState(false)
  const [deleteModal2, setDeleteModal2] = useState(false)
  const [editItem, setEditItem] = useState('')
  useEffect(() => {
    axios.get(`http://localhost:8000/blogs`).then((res) => {
      console.log(res);
      setBlogs(res?.data);
    });
  }, []);
  const AddNewUser =()=> {
    setModal(true)
  }
  const deleteUser =(item)=> {
    setEditItem(item)
    setDeleteModal2(true)
  }
  const editUser =(item)=> {
    setEditItem(item)
    setModal(true)
  }
  const decreaseCount =(item)=> {
    let payload = {
      name: item.name,
      surname: item.surname,
      phone: item.phone,
      count: item.count -= 1,
      active: false
    }
    axios.put(`http://localhost:8000/blogs/${item.id}`,{...payload}).then((res)=> {
      if(res.status === 200) {
        window.location.reload()
      }
    })
  }
  const increaseCount =(item)=> {
    let payload = {
      name: item.name,
      surname: item.surname,
      phone: item.phone,
      count: item.count += 1,
      active: false
    }
    axios.put(`http://localhost:8000/blogs/${item.id}`,{...payload}).then((res)=> {
      if(res.status === 200) {
        window.location.reload()
      }
    })
  }
  const setActive =(item)=> {
    let payload = {
      name: item.name,
      surname: item.surname,
      phone: item.phone,
      count: item.count,
      active: !item.active
    }
    axios.put(`http://localhost:8000/blogs/${item.id}`,{...payload}).then((res)=> {
      if(res.status === 200) {
        window.location.reload()
      }
    })
  }
  const toggle =()=> {
    setModal(false)
    setDeleteModal2(false)
    setEditItem('')
}
const searchUsers =(e)=> {
    let search = e.target.value
    if(search === "") {
        axios.get(`http://localhost:8000/blogs`).then((res) => {
            console.log(res.data);
            setBlogs(res?.data);
        });
    } else {
        let filtered_user = blogs.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.surname.toLowerCase().includes(search.toLowerCase()))
        setBlogs([...filtered_user])
        console.log(filtered_user);

    }
}
  return (
    <div>
      <AddUserModal open={modal} toggle={toggle} editItem={editItem} setEditItem={setEditItem}/>
      <DeleteModal2 open={deleteModal2} toggle={toggle} editItem={editItem} />
      <div className="row">
        <div className="col-4 offset-2 mt-5">
          <input type="text" className="form-control" placeholder="Search" onChange={searchUsers}/>
        </div>
      </div>
      <div className="row">
        <div className="col-4 offset-2 mt-5 my-3">
          <button className="btn btn-success" onClick={AddNewUser}>Add</button>
        </div>
      </div>
      <div className="row">
        <div className="col-8 offset-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>T/R</td>
                <td>Name</td>
                <td>Surname</td>
                <td>Phone</td>
                <td>Active</td>
                <td>Count</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.phone}</td>
                    <td>
                      <input type="checkbox" checked={item.active} onClick={()=>setActive(item)}/>
                      <p>{item.active ? "True" : "False"}</p>
                    </td>
                    <td className=" d-flex align-items-center">
                      <button className="btn btn-dark" onClick={()=>decreaseCount(item)}>-</button>
                      <h1>{item.count}</h1>
                      <button className="btn btn-warning" onClick={()=>increaseCount(item)}>+</button>
                    </td>
                    <td>
                      <button className="btn btn-info mx-2" onClick={()=>editUser(item)}>Edit</button>
                      <button className="btn btn-danger" onClick={()=>deleteUser(item)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users
