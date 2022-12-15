import axios from "axios";
import {usestate, useState } from "react";
import File from "./File";
import "./hotel.css";

const Addhotelrooms =() =>{
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
    const[ hotel, setHotel]= useState({
        
        name:"",
        location:"",
        pricePerRoom:0,
        contact:"",
        availableRooms:"",
        hotelId:"",
        dictels:"",
        image:"",
        description:"",
    })
    const imagesHandler = (images) => {
        setHotel({ ...hotel, image: images[0]?.url });
      };
    
      const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setHotel({
          ...hotel,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post(`http://localhost:5000/create_hotel`, hotel, {})
          .then((response) => {
            setSuccess(response.data.message);
            setHotel({
              name: "",
              pricePerRoom: 0,
              availableRooms: "",
              hotelid: null,
              contact: 0,
              location: "",
              dictels: "",
              image: "",
              description:"",
            });
          })
          .catch((err) => {
            setError("Hotel not added, error occured");
          });
      };
    
      return (
        <div className="addHotelContainer">
          {success && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              {success}
            </p>
          )}
          {error && (
            <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          )}
    
          <File
            imagesHandler={(images) => imagesHandler(images)}
            reset={false}
          />
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="addhotelContainerForm"
          >
            <input
              name="name"
              type="text"
              value={hotel.name}
              placeholder="Enter hotel name"
              onChange={(event) => handleChange(event)}
            />
            <br />
            <textarea
            rows="5"
            cols="50"
            name="description"
            type="text"
            value={hotel.description}
            placeholder="Enter hotel description"
            onChange={(event)=> handleChange(event)}
            >
            enter hotel description
            </textarea>
            <br />
            <input
              name="pricePerRoom"
              type="number"
              value={hotel.pricePerRoom}
              placeholder="Enter hotel price per Room"
              onChange={(event) => handleChange(event)}
            />
            <br />
            <select
              name="category"
              onChange={(event) => handleChange(event)}
            >
              <option value="company">Company</option>
              <option value="Hotel">Hotel</option>
              <option value="Market">Market</option>
              <option value="Hospitel">Hospitel</option>
            </select>
            <br />
            <select
              name="hotelID"
              onChange={(event) => handleChange(event)}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
            <br />
            <input
              name="contact"
              value={hotel.quantity}
              placeholder="Enter hotel contact"
              onChange={(event) => handleChange(event)}
            />
            <br />
            <input
              name="location"
              value={hotel.location}
              placeholder="Enter hotel location"
              onChange={(event) => handleChange(event)}
            />
            <br />
            <input
              name="dictels"
              value={hotel.supplier}
              placeholder="Enter hotel dictels"
              onChange={(event) => handleChange(event)}
            />
            <br />
            <button type="submit">Add hotel</button>
          </form>
        </div>
      );
    };
export default Addhotelrooms;