import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Login() {
  const [fields, setfields] = useState(
    {
      email:'',
      password:'',
  })

  const navigateTo = useNavigate()
  const SubmitControl = async(target)=>{
    target.preventDefault()

    const response = await fetch('http://localhost:5000/api/loginUsers',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({ 
        email:fields.email, 
        password:fields.password, 
      })
    });
    const Json = await response.json()
    console.log(Json)

    if(!Json.success)
    alert("Enter valid credentials")
    if(Json.success)
    localStorage.setItem("userEmail",response)
    localStorage.setItem("authToken",Json.authToken)
    navigateTo('/')

  }

  let onChange=(event)=>{
      setfields({...fields,[event.target.name]:[event.target.value]})
  }

  return (
    <div style={{margin:10}}>
      <form onSubmit={SubmitControl}>
        <div className="mb-3">
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email"  className='form-control'name='email'value={fields.email} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password"  className='form-control'name='password'value={fields.password} onChange={onChange}/>
        </div>
        <div>
            <button type='submit' className='btn btn-success' style={{marginRight:"10px"}}>Submit</button>
            <Link to="/createUsers" className='btn btn-danger'>New User</Link>
        </div>
      </form>
    </div>
  )
}
