import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotels`, {})
      .then((response) => {
        setHotels(response.data.hotels);
      })
      .catch((err) => {
        //setError(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {hotels?.map((hotel) => {
        console.log(hotel);
        return (
          <Link to={`/product/${hotel.hotelId}`}>
            <div
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid black",
              }}
            >
              <img src={hotel?.image} />
              <h3>{hotel.name}</h3>
              <p>{hotel.pricePerRoom} XAF</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
