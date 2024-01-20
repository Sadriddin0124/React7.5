import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUserModal from "./components/AddUserModal";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Users2 from "./components/Homework 2/Users2";
import Menu from "./components/Menu";

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="homework1" element={<Users/>}/>
        <Route path="homework2" element={<Users2/>}/>
      </Routes>
    </div>
  );
};

export default App;
