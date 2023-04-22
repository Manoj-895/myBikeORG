import React, {useRef, useState, useContext } from 'react';
import axios from "axios";
import { GlobalContext } from '../GlobalContext';
import moment from 'moment';


export default function Booking() {

  const myStyle = {
    textAlign: "center",
    color: "black",
    backgroundColor: "Aqua",
    padding: "10px",
    fontFamily: "Arial"
};
  
const ooo = useRef(null);

  const data = useContext(GlobalContext);
  const email = data.userApi.user[0].email;
  const [bookinfo, setbookinfo] = useState([]);

  const dataloader = async () => {
    try {
      const data = await axios.post('/bookinginfo',{email});
      console.log(data.data);
      setbookinfo(data.data.data);
      ooo.current.style.display = "block"
    } catch (e) {
      console.log(e);
    }
  }

  const delHandler = async (id) => {
    console.log(id);
    try {
      const data = await axios.post('/delbooking', { id });
      console.log(data.data.msg);

      dataloader();
    } catch (e) {
      console.log(e);
    }
  }

  console.log("state info", bookinfo);
  return (
    <div>

      <nav class="navbar navbar-expand-lg text-light bg-light">
        <div class="container-fluid">
          <img src="https://img.freepik.com/free-vector/flat-red-sport-bike-concept_1284-36218.jpg?size=338&ext=jpg&ga=GA1.2.1766061829.1658938052"
            alt="" height="30px" width="30px" />
          <a class="navbar-brand">MY Bike . Org</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a type="button" href="/" class="btn btn-light">Home</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <h3 style={myStyle}>Your Booking details on One Click</h3>
      <br />
      <button class="btn btn-light" style={{ width: "100%" }} onClick={dataloader}>Get Details</button>
      <div style={{ margin: "0px 20px 0px 20px" }}>
        <br />
        <div class="row" style={{ margin: "20px 20px 20px 20px" }}>
          {
            bookinfo.length !== 0 ?
              <div>
                {
                  bookinfo.map((item) =>
                    <div class="card bg-light mb-3" style={{ maxWidth: "18rem", margin: "20px 20px 20px 20px" }} key={item._id}>
                      <div class="card-header"><h3>{item.name}</h3></div>
                      <div class="card-body">
                        <h5 class="card-title">{moment(`${item.date}`).format("MMM Do YY")}</h5>
                        <p class="card-text">{item.time}</p>
                        <br />
                        <button class="btn btn-outline-primary" onClick={() => { if (window.confirm("Are you sure to delete the slot")) { delHandler(item._id) } }}>Delete</button>
                      </div>
                    </div>
                  )}
              </div>:
              <div><h1><em style={{ display: 'none' }} ref={ooo}>No Bookings Present</em></h1></div>
          }

        </div>
      </div>
    </div>
  )
}