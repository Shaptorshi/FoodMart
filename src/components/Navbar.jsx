import React, { useState } from 'react'
import Cart from '../screens/Cart';
import Model from '../Model';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import { useCart } from './ContextReducer';
export default function Navbar() {
  const [cartView, setcartView] = useState(false)
  const data = useCart()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="btn text-white" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem('authToken')) ?
                <li className="nav-item">
                  <Link className="btn text-white" aria-current="page" to="/myorderData">MyOrders</Link>
                </li>
                : ""
              }
            </ul>
            {(!localStorage.getItem('authToken')) ?
              <div className='d-flex justify-content-center'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createUsers">SignUp</Link>
              </div>
              : <>
                <div className='btn bg-white text-success mx-2' onClick={() => setcartView(true)}>
                  My Cart{" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                  {cartView ? <Model onClose={() => setcartView(false)}><Cart></Cart></Model> : ""}
                <div className='btn bg-white text-success mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

