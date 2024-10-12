import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import './App.css'

function App() {

  const [city, setCity] = useState("")
  const [weather, setWeather] = useState("")

  const handleCityChange=(inputTag)=>{
    const { value } = inputTag
    console.log(value);
    setCity(value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDetails();
  };

  const fetchDetails= async()=>{
    if(city)
    {
        try
        {
            const response= await axios({
              method:"GET",
               url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
            })
            setWeather(response.data)
            console.log(weather);
        }
        catch(error)
        {
          alert("City Not Found")
        }
    }else
    {
      alert("Please Fill The Form Completely!!!")
    }
  }

  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark '>
        <div style={{ width: '700px' }} className='bg-light shadow rounded p-5'>
          <h2 className='text-center fw-bolder' >Find Out the Current Weather</h2>
          <div className='d-flex'>
            <TextField color='dark' onChange={e=>handleCityChange(e.target)} id="outlined-basic" className='w-75' label="Enter Your City" variant="outlined" />
            <Button sx={{backgroundColor:'black'}} onClick={handleSearch} variant="contained">Search<i className="fa-solid fa-magnifying-glass px-1"></i></Button>
          </div>
          {
            weather && (
              <div style={{ width: '600px', height: '400px' }} className='row d-flex py-5'>
                <div className="col-6 d-flex align-items-center justify-content-center bg-dark p-4 rounded-start">
                  <h2 className="display-4 text-light"> <i className="fa-solid fa-thermometer-empty"></i>
                  {weather.main.temp}°C</h2>
                  
                </div>
                <div className="col-6 bg-secondary text-white p-4 rounded-end">
                  <h2 className="fw-bold">{weather.name}</h2>
                  <h4 className=''> <i className="fa-solid fa-cloud"></i>
                  {weather.weather?.map(item=>item.description)}</h4>
                  <p><i className="fa-solid fa-globe"></i>
                    Country: {weather.sys.country}</p>
                  <p><i className="fa-solid fa-temperature-quarter"></i>  Feels Like: {weather.main.feels_like} &deg;C</p>
                  <p><i className="fa-solid fa-droplet"></i> Humidity: {weather.main.humidity}%</p>
                  <p><i className="fa-solid fa-wind"></i> Wind: {weather.wind.speed} km/h</p>
                  <p><i className="fa-solid fa-tornado"></i> Pressure: {weather.main.pressure}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
