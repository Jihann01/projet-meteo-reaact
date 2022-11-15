import React from 'react';
import moment from 'moment';
import '../css/Elemtscarte.css';
function Elemtscarte({weather_icon, data}) {
  const {clouds, main, weather} = data.list[0]
  return (
    <div className="details">
       <div className="clouds">
           <p className="celsius">{Math.round(main.temp)}&deg;C</p>
           <div className="cloud-icon">
            {weather[0].main}
            <img src={weather_icon} alt=''/>
           </div>
           <p className="des">{weather[0].description}</p>
           <p className="time">{moment().format("dddd MMM YYYY")}</p>
       </div>
       <div className="more-info">
           <p>Se sent comme: {Math.round(main.feels_like)}&deg;C</p>
           <hr></hr>
           <p>Humidité : {main.humidity}%</p>
           <hr></hr>
           <p>Couverture nuageuse : {clouds.all}</p>
           <hr></hr>
           <p>Min Temp: {Math.round(main.temp_min)}&deg;C</p>
           <hr></hr>
           <p>Max Temp: {Math.round(main.temp_max)}&deg;C</p>
       </div> 
    </div>
  )
}

export default Elemtscarte;