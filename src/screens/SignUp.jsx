import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  const [fields, setfields] = useState(
    {
      userid:'',
      email:'',
      password:'',
      location:''
  })


  const SubmitControl = async(target)=>{
    target.preventDefault()

    const response = await fetch('http://localhost:5000/api/createUsers',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        userid:fields.userid, 
        email:fields.email, 
        password:fields.password, 
        location:fields.location
      })
    });
    const Json = await response.json()
    console.log(Json)

    if(!Json.success)
    alert("Enter valid credentials")
  }

  let onChange=(event)=>{
      setfields({...fields,[event.target.name]:[event.target.value]})
  }
  return (
    <div style={{margin:10}}>
      <form onSubmit={SubmitControl}>
        <div className="mb-3">
            <label htmlFor="userid" className='form-label'>UserId</label>
            <input type="text"  className='form-control' name='userid' value={fields.userid} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email"  className='form-control'name='email'value={fields.email} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password"  className='form-control'name='password'value={fields.password} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="location" className='form-label'>Location</label>
            <input type="text"  className='form-control'name='location'value={fields.location} onChange={onChange}/>
        </div>
        <div>
            <button type='submit' className='btn btn-success' style={{marginRight:"10px"}}>Submit</button>
            <Link to="/login" className='btn btn-danger'>Already an User</Link>
        </div>
      </form>
    </div>
  )
}
