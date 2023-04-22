
import React, { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { GlobalContext } from '../GlobalContext';




export default function Example() {
    const data = useContext(GlobalContext);
    const [show, setShow] = useState(false);
    const [isreg, setReg] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [regist, setregist] = useState({
        email: "",
        password: "",
        mobile: ""
    });
    const [login, setlogin] = useState({
        email: "",
        password: ""
    });

    const RegChange = (e) => {
        let { name, value } = e.target;
        setregist({ ...regist, [name]: value });
    };

    const LogChange = (e) => {
        let { name, value } = e.target;
        setlogin({ ...login, [name]: value });
    };

    const REG = () => {
        setReg(!isreg);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("In handler")
            let res = await axios.post('/register', { ...regist })
            if (res.data === "exist") {
                localStorage.setItem("loginStatus",false);
                alert("User already Exists");
                handleClose();
            }
            else if (res.data === "wrong"){
                alert("Enter as per the mentioned formats")
            }
            else {
                handleClose();
                setReg(true);
                alert("registered Sucessfully");

            }
        } catch (err) {
            console.log(err.responce.data.message);
        }
    }

    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("In handler");
            let res = await axios.post('/login', { ...login });
            console.log(res);
            if(res.data.accessToken){
                localStorage.setItem("loginstatus",true);
                handleClose();
                alert("logged in sucessfully");
                window.location.href="/"
                //okk
            }
            else{
                alert("wrong credentials");
            }
        } catch (err) {
            console.log(err.responce.data.message);
        }
    }


   const logoutHander = async ()=>{
    let res = await axios.post('/logout');
        console.log(res.data.msg)
        if(res.data.msg === 'logedout'){
            alert("Logged out Sucessfully");
            window.location.href="/"
        }

   }

  return (
    <>
    <nav class="navbar navbar-expand-lg text-light bg-light">
    <div class= "container-fluid">
        <img src="https://img.freepik.com/free-vector/flat-red-sport-bike-concept_1284-36218.jpg?size=338&ext=jpg&ga=GA1.2.1766061829.1658938052"
            alt="" height="30px" width="30px"/>
        <a class="navbar-brand">MY Bike . Org</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page">Home</a>
                </li>
            </ul>
            <ul class="nav nav-pills">

                <li className="nav-item">
                {data.userApi.islogged[0]?
                 <div></div>:
                 <Button variant="btn btn-outline-primary" onClick={handleShow} style={{margin : "5px 5px 5px 5px"}}>Login</Button>   
                 
                }
                
                {data.userApi.islogged[0]?
                <div>
                <button class="btn btn-outline-primary" onClick={logoutHander} style={{margin : "5px 5px 5px 5px"}}>Logout</button>
                <a type="button" href="/bookinginfo" class="btn btn-outline-primary" style={{margin : "5px 10px 5px 5px"}}>Mybookings</a>
                </div>
                :
                <div></div>
                }                           
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        </div>
    </nav>
    {isreg?
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e)=>submitHandler(e)}>
        <Modal.Body>
         
                      <div>
                          <label class="form-label">Email</label>
                          <input type="text" class="form-control" id="email" name="email" required onChange={(e) => RegChange(e)} />
                          <p><small>enter valid mail</small></p>
                      </div>
                      <div>
                          <label class="form-label">Password</label>
                          <input type="text" class="form-control" id="password" name="password" required onChange={(e) => RegChange(e)} />
                          <p><small>enter password with length greater than 5</small></p>
                      </div>
                      <div>
                          <label class="form-label">Mobile</label>
                          <input type="number" class="form-control" id="mobile" name="mobile" required onChange={(e) => RegChange(e)} />
                      </div>
                      <button onClick={(e)=>REG(e)} class="btn btn-link">Login</button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        <input type="submit" value="Submit" class="btn btn-outline-primary" />
        </Modal.Footer>
        </form>
        </Modal>
        :
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e)=>LoginHandler(e)}>
        <Modal.Body>
         
                      <div>
                          <label class="form-label">Email</label>
                          <input type="text" class="form-control" id="email" name="email" required onChange={(e) => LogChange(e)} />
                      </div>
                      <div>
                          <label class="form-label">Password</label>
                          <input type="text" class="form-control" id="password" name="password" required onChange={(e) => LogChange(e)} />
                      </div>
                      <button onClick={(e)=>REG(e)} class="btn btn-link">Register</button>
                      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        <input type="submit" value="Submit" class="btn btn-outline-primary" />
        </Modal.Footer>
        </form>
        </Modal>}
        <Home/>
    </>
  );
}


 function Home() {
    const myStyle = {
        textAlign: "center",
        color: "black",
        backgroundColor: "Aqua",
        padding: "10px",
        fontFamily: "Arial"
    }
    const data = useContext(GlobalContext);

    return (
        

        <div style={{ margin: '0px 25px 0px 25px ' }}>
            {/* <Example /> */}

            <h3 style={myStyle}>Welcom To MyBike.Org</h3>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="500">
                        <img src={"https://img.freepik.com/free-photo/motocross-rider-action-motocross-sport-moto-sport_654080-167.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                            class="d-block w-100" alt="..." height="500" />
                    </div>
                    <div class="carousel-item" data-bs-interval="500">
                        <img src={"https://img.freepik.com/free-photo/driving-green-neon-color-motorcycle-road_114579-5031.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                            class="d-block w-100" alt="..." height="500" />
                    </div>
                    <div class="carousel-item" data-bs-interval="500">
                        <img src={"https://img.freepik.com/free-photo/moto-rider-making-stunt-his-motorbike-biker-doing-difficult-dangerous-stunt_654080-1058.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                            class="d-block w-100" alt="..." height="500" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container" style={{ margin: "10px" }}>
                <h3>What We DOooo!!!!</h3>
                <p>
                    We are expertized in All kind of Bike Services , Modifications ext..
                    <br />
                    We are commited to work for you wholeheartedly
                    <br />
                    <b>Please do check out our below services</b>
                    <br />
                    <b>Login to use our services</b>
                </p>
            </div>
            <div class="card-group">
                <div class="card" style={{ margin: "25px" }}>
                    <img src={"https://img.freepik.com/premium-photo/custom-motorcycle-standing-repair-shop_158595-8080.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                        class="card-img-top" alt="..." style={{ height: "200px" }} />
                    <div class="card-body">
                        <h5 class="card-title">Servicing</h5>
                        <p class="card-text">Service Your Vehical</p>
                        <br />
                        {data.userApi.islogged[0] ?
                            <a type="button" href="/service" class="btn btn-outline-primary">Service</a> :
                            // <a type="button" href="/service" class="btn btn-outline-primary" style={{pointerEvents : "none"}}>Service</a>
                            <button class="btn btn-outline-primary" onClick={(e) => { alert("Need to Login to use Service") }}>Service</button>
                        }
                        {/* <NavLink to={'/service'}>Service</NavLink> */}
                    </div>
                </div>
                <div class="card" style={{ margin: "25px" }}>
                    <img src={"https://img.freepik.com/premium-photo/minivan-car-with-low-tow-trailer-road-mini-van-auto-vehicle-with-carrier-transporter-hauler-driveway-european-transport-logistics-haulage-work-transportation-haul-with-driver-highway_250132-1291.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                        class="card-img-top" alt="..." style={{ height: "200px" }} />
                    <div class="card-body">
                        <h5 class="card-title">Vehicle Towing</h5>
                        <p class="card-text">Will Bring your dear back</p>
                        <br />
                        <p style={{ color: 'red' }}>Service will be available soon</p>
                        <button type="button" class="btn btn-outline-primary">Towing</button>
                    </div>
                </div>
                <div class="card" style={{ margin: "25px" }}>
                    <img src={"https://img.freepik.com/free-photo/brand-new-shiny-black-retro-chopper-is-parked-brick-building_613910-3242.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                        class="card-img-top" alt="..." style={{ height: "200px" }} />
                    <div class="card-body">
                        <h5 class="card-title">Customize your Vehicle </h5>
                        <p class="card-text">Bring the ACtion</p>
                        <br />
                        <p style={{ color: 'red' }}>Service will be available soon</p>
                        <button type="button" class="btn btn-outline-primary">Customize</button>
                    </div>
                </div>
                <div class="card" style={{ margin: "25px" }}>
                    <img src={"https://img.freepik.com/free-photo/handsome-elegant-man-car-salon_1157-21751.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"}
                        class="card-img-top" alt="..." style={{ height: "200px" }} />
                    <div class="card-body">
                        <h5 class="card-title">Bike Rentals</h5>
                        <p class="card-text">Ride as you wish</p>
                        <br />
                        <p style={{ color: 'red' }}>Service will be available soon</p>
                        <button type="button" class="btn btn-outline-primary">Rent</button>
                    </div>
                </div>
            </div>
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" >
                <div class="col-md-4 d-flex align-items-center">
                    <span class="text-muted" style={{margin: '5px 5px 5px 5px '}}>© 2022 My Bike.Org</span>
                </div>
                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex"style={{margin: '5px 5px 5px 5px '}}>
                    <li class="ms-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope-heart" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.76 2.76 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124c.146.277.329.556.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442c.22-.28.403-.56.55-.836L15 11.105V5.383l-3.002 1.801a2.76 2.76 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1H2Zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                    </svg></li>
                    <li class="ms-3"><a class="text-muted" href="https://www.instagram.com/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg></a></li>
                </ul>
            </footer>
        </div >
    )
};