import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const AddNewUserModal = ({ open, toggle, editUser, startDate, setStartDate }) => {
  const [genderstatus, setGenderStatus] = useState("");
  const handleAdd = (e) => {
    e.preventDefault();
    let full_name = e.target[0].value;
    let profession = e.target[1].value;
    let gender = genderstatus;
    let birth_date = e.target[4].value;
    let payload = {
      full_name,
      profession,
      gender,
      birth_date,
    };
    console.log(editUser.id);
    if (editUser.id !== undefined) {
      axios
        .put(`http://localhost:8000/users/${editUser.id}`, { ...payload })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        });
    } else {
      axios.post(`http://localhost:8000/users`, { ...payload }).then((res) => {
        if (res.status === 201) {
          window.location.reload();
        }
      });
    }
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>
          <h1>Add User</h1>
        </ModalHeader>
        <ModalBody>
          <form id="newuser" onSubmit={handleAdd}>
            <input
              type="text"
              className="form-control my-2"
              placeholder="Fullname"
              defaultValue={editUser.full_name}
            />
            <select
              className="form-control my-2"
              defaultValue={editUser.profession}
            >
              <option value="" hidden>
                Select your occupation
              </option>
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
              <option value="Accounting">Accounting</option>
            </select>
            <h3>Select your gender</h3>
            <label className="form-control my-2">
              <input
                type="radio"
                name="gender"
                onChange={() => setGenderStatus("Male")}
              />
              Male
            </label>
            <label className="form-control my-2">
              <input
                type="radio"
                name="gender"
                onChange={() => setGenderStatus("Female")}
              />
              Female
            </label>
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" type="submit" form="newuser">
            Save
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddNewUserModal;
