import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import './Styles/City.css'
import Weather from './Weather'
import Forecast from './Forecast'

interface WeatherData {
  weather: [
    {
      description: string
    }
  ]
}

const City: FC = () => {
  const [city, setCity] = useState<string>('')
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  )

  useEffect(() => {
    const fetchData = async (city: string) => {
      const result = await axios(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4f7670c35baa2d7d1524b32cb00c65d3`
      )
      setWeatherData(result.data)
    }
    if (city) {
      fetchData(city)
    }
  }, [city])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className='logo'>
            Right now in
            <input type='text' placeholder='' onChange={handleChange} />
            {weatherData ? (
              <p>, it's {weatherData.weather[0].description}</p>
            ) : (
              <p>No data</p>
            )}
          </p>
          <div>
            <Weather city={city} />
          </div>
          <div>
            <Forecast city={city} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default City
