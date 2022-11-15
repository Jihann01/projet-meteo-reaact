import { TbSearch } from 'react-icons/tb'
import { useState } from 'react'
import Header from './components/Header';
import Elemtscarte from './components/Elemtscarte';
import Smry from './components/Smry';
function App() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setNoData] = useState('Aucune information')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Ville inconnue')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try {
      let res = await fetch(`${process.env.REACT_APP_URL+how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if(data.cod !=200) {
        setNoData('Ville Introuvable')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const {latitude, longitude} = location.coords
    getWeather([latitude, longitude])
  }

  return (
    <div className="container">
      <div className="blur"></div>
      <div className="blur"></div>
      <div className="content">
        <div className="form-container">
          <div className="name">
            <div className="logo">Jihan - Application météo<hr></hr></div>
            <div className="city">
              <p>{city}</p>
            </div>
          </div>
          <div className="search">
            <h2>Les prévisions météologiques les plus proches !</h2>
            <hr />
            <form className="search-bar" noValidate onSubmit={handleSubmit}>
              <input type="text" name="" id="" placeholder='Entrez la ville pour predire le climat' onChange={handleChange} required/>
              <button className="s-icon">
                  <TbSearch 
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(myIP)
                    }}
                  />
              </button>
            </form>
          </div>
          
        </div>
        <div className="info-container">
          <Header />
          <hr />
          {weatherData.length === 0 ? 
              <div className="nodata">
                <h1>{noData}</h1>
              </div> : 
              <>
                <div className='infos'>
                  <div className='carte1'>
                <h2>Aujourd'hui</h2>
                <div className='cc1'>
                <Elemtscarte weather_icon={weatherIcon} data={weatherData} />
                </div>
                </div>
                <div className='carte2'>
                <h2 className="title"> Voir Plus sur la ville de : {city}</h2>
                <div className='test'>
                  {weatherData.list.map((days, index) =>{
                    if(index > 0){
                      return (<Smry key={index} day={days} />)
                    }
                  })}
                </div>
                </div>
                </div>
              </>
            }
            
        </div>
      </div>
    </div>
  );
}

export default App;