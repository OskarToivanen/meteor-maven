import axios from 'axios'
import { useState, useEffect, FC } from 'react'
import './Styles/Forecast.css'

interface Props {
  city: string
}

interface WeatherData {
  list: Array<any>
}
const Forecast: FC<Props> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchData = async (city: string) => {
      const result = await axios(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4f7670c35baa2d7d1524b32cb00c65d3&units=metric`
      )
      setWeatherData(result.data)
    }
    if (city) {
      fetchData(city)
    }
  }, [city])

  const getFiveDayForecast = () => {
    const forecasts = weatherData?.list.filter((data, index) => index % 8 === 0)
    return forecasts
  }

  const fiveDayForecast = getFiveDayForecast()

  return (
    <>
      <div className='forecast__wrapper'>
        {fiveDayForecast ? (
          fiveDayForecast.map((data) => (
            <div>
              <div key={data.dt}>
                <p>
                  {new Date(data.dt * 1000)
                    .toDateString()
                    .split(' ')
                    .slice(0, 1)
                    .join(' ')}
                </p>
                <p>
                  {data.main.temp_min}° / {data.main.temp_max}°
                </p>
                <p>{data.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt='Weather icon'
                />
              </div>
            </div>
          ))
        ) : (
          <p>No forecast available for {city}</p>
        )}
      </div>
    </>
  )
}

export default Forecast
