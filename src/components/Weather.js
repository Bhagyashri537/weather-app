import React, { useState, useEffect } from "react";
import images from "../assets/images.jpg";
import logo from "../assets/logo.jpg";

const Weather = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;

    const apiKey = "dfbdd51d2b7555325163c6fba9b374b7";
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
      const response = await fetch(api_url);
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData("");
  }, []);

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <div className="absolute inset-0 h-96">
        <img
          src={images}
          alt="/"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-4xl font-bold top-3">Weather App</div>
          <div className="mt-9 flex flex-col">
            <input
              type="text"
              className="w-96 hover:ring-2 ring-blue-400 p-3 shadow-xl rounded-lg"
              value={city}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white rounded-lg shadow-lg p-2 my-5 mx-32">Search</button>
          </div>
        </div>
        <div className="bg-black py-9 text-center flex flex-col items-center ">
         
        <div className=" h-72">
            <img src={logo} alt="/" className="w-20 shadow-cyan-700 shadow-lg rounded-2xl " />
            <h2 className="text-xl font-medium text-white  pt-9">{data?.name}</h2>
            
            <h2 className="bg-orange-400 p-2 rounded-2xl items-center">{((data?.main?.temp) - 273.15).toFixed(2)}*C</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
