import React,{useState,useRef,useEffect} from 'react'
import { useDispatchCart,useCart } from './ContextReducer'
export default function Card(props) {

  let dispatch = useDispatchCart()
  let data = useCart()
  let options = props.options
  let priceOptions = Object.keys(options)
  const priceRef = useRef()
  const [qty, setqty] = useState(1)
  const [size, setsize] = useState("")
  let finalPrice = qty * options[size]
  const handleAddToCart = async() => {
    await dispatch({type:"ADD",id:props.foodItems._id,name:props.foodItems.name,price:finalPrice,qty:qty,size:size})
    console.log(data)
  }
  useEffect(() => {
    setsize(priceRef.current.value)
  }, [])
  

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img style={{ height: "190px" }} src={props.foodItems.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title m-0">{props.foodItems.name}</h5>
            <p className="card-text" style={{ margin: "0" }}>Text</p>
            <div className='container' >
              <select id="select" className='m-2 bg-success rounded' style={{ color: "white" }} onChange={(e)=>setqty(e.target.value)}>
                {Array.from(Array(6), (o, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })

                }
              </select>
              <select className="m-2 bg-success rounded" style={{ color: "white" }}  ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                {priceOptions.map(data => {
                  return (
                    <option key={data} value={data}>{data}</option>
                  )
                })}
              </select>
              <div className='d-inline fs-6' >
                {finalPrice}
                <hr style={{ marginBottom: "2px" }} />
                <div>
                  <button type="submit" className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
