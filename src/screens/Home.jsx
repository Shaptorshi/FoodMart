import React, { useState, useEffect } from 'react'

import momos from '../images/momos.jpg'
import burger from '../images/burger.jpg'
import pizza from '../images/pizza.jpg';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search, setsearch] = useState('')
  const [foodCategory, setfoodCategory] = useState([])
  const [foodItem, setfoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    response = await response.json();

    setfoodItem(response[0])
    setfoodCategory(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  const onChange=(e)=>{
    setsearch(e.target.value)
  }
  return (
    <div>
      <div><Navbar /></div>
      <div>
      <div className="carousel-inner" id="carousel">
          <div className='carousel-caption' style={{zIndex:"10"}}>
            <div className="form-inline d-flex">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
            </div>
          </div>
          <div className="carousel-item active">
            <img src={burger} className="d-block w-100" id="image" alt=".."style={{filter:"brightness(30%)"}}/>
          </div>
          <div className="carousel-item">
            <img src={momos} className="d-block w-100" id="image" alt=".."style={{filter:"brightness(30%)"}}/>
          </div>
          <div className="carousel-item">
            <img src={pizza} className="d-block w-100" id="image" alt=".."style={{filter:"brightness(30%)"}}/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        
        </div>
      <div className='container' style={{ marginLeft: "25px" }}>
        {
          foodCategory != []
            ? foodCategory.map((data) => {
              return (<div className='row'>
                <div key={data._id} style={{fontSize:"30px"}}>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem != []
                  ? foodItem.filter(item=>item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                  .map(filterItems=>{
                      return(
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItems={filterItems}
                            options = {filterItems.options[0]}
                          />
                        </div>
                      )
                    }  
                  )
                :<div>No such data found</div>
                }
              </div>
              )
            })
            : ""
        }

        <div><Footer /></div>
      </div>
    </div>
  )
}
