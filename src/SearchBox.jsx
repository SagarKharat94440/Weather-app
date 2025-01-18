import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({updatateInfo}) {
    let [city, setCity] = useState("");
    let [err, setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "fffe7263abc973e98742c4b533fe66b3";
    
    let getWeatherInfo = async () => {
        try{
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            city:city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
        }catch(err){
            throw err;
        }
    };

   let handleChange = (evt) =>{
    setCity(evt.target.value);
   }

   let handleSubmit = async(evt) =>{
    try{
    evt.preventDefault();
    console.log(city);
    setCity("");
     let newInfo = await getWeatherInfo();
     updatateInfo(newInfo);
    }catch(err){
        setError(true);
    }
   }

    return(
        <div className="SearchBox">
           
            <form>
            <TextField id="city" label="City name" variant="outlined" value={city} onChange={handleChange} required/>
            <br></br><br></br>
            <Button variant="contained" onClick={handleSubmit}>Search</Button>
            {err && <p style={{color: "red"}}>No such place in API</p>}
            </form>
        </div>
    )
}
