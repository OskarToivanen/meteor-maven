import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import './Styles/Weather.css'
import { WiHorizonAlt, WiHorizon, WiStrongWind } from 'react-icons/wi'

interface Props {
  city: string
}

interface WeatherData {
  city: string
  weather: [
    {
      icon: string
    }
  ]
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
  wind: {
    speed: number
  }
  sys: {
    sunrise: number
    sunset: number
  }
}

const Weather: FC<Props> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  )

  useEffect(() => {
    const fetchData = async (city: string) => {
      const result = await axios(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f7670c35baa2d7d1524b32cb00c65d3&units=metric`
      )
      setWeatherData(result.data)
    }
    if (city) {
      fetchData(city)
    }
  }, [city])

  return (
    <div className='wrapper'>
      {weatherData ? (
        <div className='container'>
          <div className='icon'>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt='wthr img'
            />
          </div>
          <div className='temp'>
            <p></p>
            <p className='main__temp'>{Math.round(weatherData.main.temp)}</p>
            <p>
              {weatherData.main.temp_min}° / {weatherData.main.temp_max}°
            </p>
          </div>
          <div className='info'>
            <p>
              <WiHorizonAlt />
              {moment.unix(weatherData.sys.sunrise).format('LTS')}
            </p>
            <p>
              <WiHorizon />
              {moment.unix(weatherData.sys.sunset).format('LTS')}
            </p>
            <p>
              <WiStrongWind />
              {weatherData.wind.speed}m/s
            </p>
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}

export default Weather
