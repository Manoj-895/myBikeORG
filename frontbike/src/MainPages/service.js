import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from 'moment';
import { GlobalContext } from '../GlobalContext';
import $ from 'jquery';


export default function Service() {
    const data = useContext(GlobalContext);
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };
    const handleShow = () => setShow(true);

    $(document).on("change", "#from", function () {
        debugger
        var date = $(this).val();
       
        $('#to').attr('min', date);
    
    });

    const myStyle = {
        textAlign: "center",
        color: "black",
        backgroundColor: "Aqua",
        padding: "10px",
        fontFamily: "Arial"
    };

    const cardStyle = {
        margin: "25px 25px 25px 25px",
        display: "none"
    }
    const inel = useRef(null);
    const nine = useRef(null);
    const one = useRef(null);
    const five = useRef(null);
    const all = useRef(null);

    const mail = data.userApi.user[0].email;

    const [booking, setBooking] = useState({
        name: "",
        email: "",
        type: "",
        date: "",
        time: ""
    });

    useEffect(() => {
        setBooking({ ...booking, ["email"]: mail });
    }, [mail])


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/service', { ...booking });
            handleShow()
        } catch (err) {
            console.log(err.responce.data.message);
        }
    }

    const Change = (e) => {

        let { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    }

    async function slots() {
        let y = inel.current.value
         console.log(y)
        
        setBooking({ ...booking, ["date"]: y});
        await fetch('/slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date1: y
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            nine.current.style.display = "none";
            one.current.style.display = "none";
            five.current.style.display = "none";
            all.current.style.display = "none";

            if (data.y === 3) {
                nine.current.style.display = "block";
                one.current.style.display = "block";
                five.current.style.display = "block";
            }
            else if (data.y === 1) {

                let x = [nine, one, five];
                let y = ["9 am", "1 pm", "5 pm"];
                x.forEach((aa, index) => {
                    const p = y[index];
                    if (data.a !== p) {
                        aa.current.style.display = "block";
                    }
                })
            }
            else if (data.y === 2) {

                let x = [nine, one, five];
                let y = ["9 am", "1 pm", "5 pm"];
                x.forEach((aa, index) => {
                    const p = y[index];
                    if (data.a !== p & data.b !== p) {
                        aa.current.style.display = "block";
                    }
                })
            }
            else {
                all.current.style.display = "block";
            }

        })

    }
    function Navigate(e) {
        e.preventDefault();
        window.location.href = "/"
    }


    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Confirmed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Thanks for Booking </b>
                    <p>Your Booking information has been shared to the given MailId {booking.email}</p>
                    <p>If You want to delete booking please go to MyBookings </p>
                    <i>You Will be redirected to home page</i>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => Navigate(e)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                <a type="button" href="/" class="btn btn-light">Home</a>:
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <h3 style={myStyle}>Thanks for choosing our services</h3>
            <div class="container">

                <form onSubmit={(e) => submitHandler(e)}>
                    <div>
                        <label class="form-label"><b>Bike Name</b></label>
                        <input type="text" class="form-control" id="name" name="name" required onChange={(e) => Change(e)} placeholder={"bike name"} style={{ width: "300px" }} />
                    </div>
                    <br />
                    <div>
                        <label class="form-label"><b>Email</b></label>
                        <input type="text" class="form-control" id="email" name="email" required value={mail} placeholder={"aaaa@gmail.com"} style={{ width: "300px" }} disabled />
                    </div>
                    <br />
                    <label class="form-label"><b>Type Of Service</b> </label>
                    <select class="form-select" aria-label="Default select example" id="type" name="type" required onChange={(e) => Change(e)} style={{ width: "300px" }}>
                        <option selected>Select Service Type</option>
                        <option value="Normal Bike service">Normal Bike service</option>
                        <option value="Parts Change">Parts Change</option>
                        <option value="Accident">Accident</option>
                    </select>
                    <br />
                    <div>
                        <label for="date" class="form-label"><b>Date</b></label>
                        <input type="Date" class="form-control" id="date" name="date" ref={inel} onChange={(e) => slots(e)} required style={{ width: "300px" }} min={new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString().split('T')[0]}/>
                    </div>
                    <br />
                    <br />

                    <div class="card-deck">
                        <div class="row">
                            <div class="card col-md-3" id="9 am" ref={nine} style={cardStyle}>
                                <img src="https://img.freepik.com/free-photo/sunset-saucer-caffeine-liquid-hot_1203-5658.jpg?w=996&t=st=1661363317~exp=1661363917~hmac=987294bc8522922126ddb34a8d3f0fb512ad1d8b70a70fd8f133bb0f70790aaf"
                                    class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Select your Slot</h5>
                                    <p class="card-text">Fix it Fresh</p>
                                    <br />
                                    <label for="time">9 am</label>
                                    <input type="radio" value="9 am" class="btn btn-outline-primary" id="time" name="time" onChange={(e) => Change(e)} required />
                                </div>
                            </div>
                            <div class="card col-md-3" id="1 pm" ref={one} style={cardStyle}>
                                <img src="https://img.freepik.com/free-photo/look-from-sun-shining-through-tree-branches_1304-5561.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"
                                    class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Select your Slot</h5>
                                    <p class="card-text">After Lunch work</p>
                                    <br />
                                    <label for="time">1 pm</label>
                                    <input type="radio" value="1 pm" class="btn btn-outline-primary" id="time" name="time" onChange={(e) => Change(e)} required />
                                </div>
                            </div>
                            <div class="card col-md-3" id="5 pm" ref={five} style={cardStyle}>
                                <img src="https://img.freepik.com/free-photo/speed-neon-lights-city_23-2149552521.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052https://img.freepik.com/premium-photo/minivan-car-with-low-tow-trailer-road-mini-van-auto-vehicle-with-carrier-transporter-hauler-driveway-european-transport-logistics-haulage-work-transportation-haul-with-driver-highway_250132-1291.jpg?size=626&ext=jpg&ga=GA1.2.1766061829.1658938052"
                                    class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Select your Slot</h5>
                                    <p class="card-text">Make it with a Tea</p>
                                    <br />
                                    <label for="time">5 pm</label>
                                    <input type="radio" value="5 pm" class="btn btn-outline-primary" id="time" name="time" onChange={(e) => Change(e)} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="all" ref={all} style={{ display: "none" }}>
                        <h1>SORRY!!</h1>
                        <h2>All slots for the day are booked</h2>
                        <h2>Check for other dates please</h2>
                    </div>
                    <br />
                    <input type="submit" value="Book My Slot" class="btn btn-sucess btn-outline-primary position-relative" />
                </form>
            </div>  
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center" style={{ margin: '5px 5px 5px 5px ' }}>
                    <span class="text-muted">© 2022 My Bike.Org</span>
                </div>
                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex" style={{ margin: '5px 5px 5px 5px ' }}>
                    <li class="ms-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope-heart" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.76 2.76 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124c.146.277.329.556.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442c.22-.28.403-.56.55-.836L15 11.105V5.383l-3.002 1.801a2.76 2.76 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1H2Zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                    </svg></li>
                    <li class="ms-3"><a class="text-muted" href="https://www.instagram.com/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg></a></li>
                </ul>
            </footer>
        </div>
       
    )
};