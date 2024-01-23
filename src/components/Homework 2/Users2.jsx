import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import AddNewUserModal from "./AddNewUserModal";
import DeleteModal from "./DeleteModal";

const Users2 = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  let [pagination, setPagination] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [delete_modal, setdelete_modal] = useState(false)
  const [editUser, setEditUser] = useState("");
  const [disabled, setDisabled] = useState('')
  const [category, setCategory] = useState('')
  useEffect(() => {
    axios.get(`http://localhost:8000/users?_page=${pagination}`).then((res) => {
      setDisabled(res?.data?.next)
      setUsers(res?.data.data);
    });
    let page = localStorage.getItem("page");
    setPagination(+page);
  }, [pagination]);
  const filtered_users = category ? users.filter(item => item.profession === category) : users

  const resetUsers = () => {
    window.location.reload();
  };
  const prevPage = () => {
    let result = (pagination -= 1);
    localStorage.setItem("page", result);
    window.location.reload();
  };
  const nextPage = () => {
    let result = (pagination += 1);
    localStorage.setItem("page", result);
    window.location.reload();
  };
  const toggle = () => {
    setModalVisible(false);
    setEditUser("");
    setdelete_modal(false)
  };
  const deleteUser = (item) => {
    setdelete_modal(true)
    setEditUser(item)
  };
  const editThatUser = (item) => {
    setEditUser(item);
    setModalVisible(true);
    setStartDate(new Date(item.birth_date))
    console.log(item.birth_date);
  };
  return (
    <div className="container">
      <AddNewUserModal
        open={modalVisible}
        toggle={toggle}
        editUser={editUser}
        setEditUser={setEditUser}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <DeleteModal
        open={delete_modal}
        toggle={toggle}
        editUser={editUser}
      />
      <div className="row">
        <div className="col-4 d-flex gap-2 my-4">
          <select className="form-control" onChange={(e)=>setCategory(e.target.value)}>
            <option value="" hidden>
              Filter
            </option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="Accounting">Accounting</option>
          </select>
          <button className="btn btn-danger" onClick={resetUsers}>
            X
          </button>
        </div>
        <div className="col-2 offset-6 d-flex justify-content-end my-4">
          <button
            className="btn btn-info"
            onClick={() => setModalVisible(true)}
          >
            Add+
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-4 d-flex gap-5 my-4">
          <button
            className="btn btn-primary"
            disabled={pagination <= 1 ? true : false}
            onClick={prevPage}
          >
            <GrPrevious />
          </button>
          <h2>{pagination}</h2>
          <button
            className="btn btn-primary"
            disabled={disabled === null  ? true : false}
            onClick={nextPage}
          >
            <GrNext />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 ">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="bg-info">№</th>
                <th className="bg-info">FullName</th>
                <th className="bg-info">Department</th>
                <th className="bg-info">Gender</th>
                <th className="bg-info">Birth Date</th>
                <th className="bg-info">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered_users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.full_name}</td>
                    <td>{item.profession}</td>
                    <td>{item.gender}</td>
                    <td>{item.birth_date}</td>
                    <td className="d-flex justify-content-center gap-2">
                      <button
                        className="text-success fs-5"
                        onClick={() => editThatUser(item)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="text-danger mx-2 fs-5"
                        onClick={() => deleteUser(item)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users2;
