import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

const HoteltDetails = () => {
  const {hotelId} = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError]= useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotel/${hotelId}`, {})
      .then((response) => {
        setHotel(response.data.hotel);
      })
      .catch((err) => {
        setError("Get requests failed");
      });
  }, []);
  
  return (
    <div>
      {hotel &&(
        <>
        <img
        src={hotel?.image}
        alt="Hotel"
        style={{with: "400px", height: "70vh"}}
      />
    
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <h3>{hotel.price}</h3>
    </>
      )}
 </div>
  );
};

export default HoteltDetails;
