import axios from 'axios';

const CONDITION_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/';
const FORECAST_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/';

export function fetchForecastData(city) {
    const url = `${FORECAST_BASE_URL}${city}.json`;
    return axios.get(url).then(response => { return response.data.forecast });//curelybracket and return must exist at same time,
}

//data.data vs response.data|| use (Response).data to access return data

export function fetchConditionData(city) {
    const url = `${CONDITION_BASE_URL}${city}.json`;
    return axios.get(url).then(data => data.data.current_observation);//simplify without return and curelybracket
}



//Performing multiple concurrent requests return a array [fetchForecastData,fetchConditionData]
export function fetchWeatherData(city) {
    return axios.all([fetchForecastData(city),fetchConditionData(city)]);
}










// export function fetchForecastData(city, onLoad) {
//     let forecastXHR = new XMLHttpRequest();
//     forecastXHR.open('GET',`${FORECAST_BASE_URL}${city}.json`);
//     forecastXHR.send();
//     forecastXHR.onload = ()=>{
//         if(forecastXHR.status === 200){
//             const dataObj = JSON.parse(forecastXHR.responseText);
//            onLoad(dataObj.forecast)
//         }
//     };
// }

// export function fetchConditionData(city, onLoad) {
//         let conditionXHR = new XMLHttpRequest();
//         conditionXHR.open('GET',`${CONDITION_BASE_URL}${city}.json`);
//         conditionXHR.send();
//         conditionXHR.onload = ()=>{
//             if(conditionXHR.status === 200){
//                 const dataObj = JSON.parse(conditionXHR.responseText);
//                onLoad(dataObj.current_observation)
//             }
//         };
// }