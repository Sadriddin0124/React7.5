import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-6 offset-3 d-flex justify-content-center gap-2 mt-5">
            <Link to='/homework1' className='btn btn-warning'>Homework 1</Link>
            <Link to='/homework2' className='btn btn-warning'>Homework 2</Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
