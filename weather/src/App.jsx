import React, { useState } from 'react'
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "f631ea87daddf959f8d7a12c30009e4c";
import './App.css'

const weatherIcons = {
    Clear: './src/assets/svg/clear.svg',
    Clouds: './src/assets/svg/cloudy.svg',
    Rain: './src/assets/svg/rain.svg',
    Snow: './src/assets/svg/snow.svg'
 }

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [inputText, setInputText] = useState('')
    const getWeather = async (cityName = "Bishkek") => {
        const res = await fetch(url + cityName + '&appid=' + apiKey)
        const data = await res.json()
        console.log(data);
        setWeatherData(data)
    }
    React.useEffect(() => {
        getWeather()
    }, []);
    
    const changeInputText = (e) => {
        setInputText(e.target.value)
    }
    
    if (weatherData === null) {
        return <h1></h1>
    }
    if (weatherData.cod == 404) {
        return <h1>{weatherData.message}</h1>
    }
    console.log(weatherData);

    const weatherCondition = weatherData.weather[0].main;
    const weatherIcon = weatherIcons[weatherCondition] || '';
    
    return (
        <div>
            <div className='header'>
                <h1>Прогноз погоды</h1>
                <div className='search'>
                    <input type="text" value={inputText} onChange={changeInputText} placeholder='Введите название города' />
                    <button onClick={() => getWeather(inputText)}>Показать</button>
                </div>
            </div>
            <div className='weather-card'>
                <div className='region'>
                    <h2>{weatherData.name}</h2>
                    <p>{weatherData.sys.country}</p>
                </div>
                <div className='temperature'>
                    <h3>{Math.round(weatherData.main.temp - 273.15)} °c</h3>
                    <img src={weatherIcon} alt={weatherCondition} />
                </div>
                <h3>{weatherData.weather[0].main}</h3>
                <h3>Ветер: <img src="./src/assets/svg/wind.svg" alt="" /> {weatherData.wind.speed} km/h</h3>
                <h3>Влажность: {weatherData.main.humidity}%</h3>
                <div className='overlay'></div>
            </div>
            
        </div>
    )
}

export default App