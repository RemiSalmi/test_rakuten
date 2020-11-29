import axios from 'axios'

export const ADD_WEATHER_SUCCESS = 'ADD_WEATHER_SUCCESS';
export const REMOVE_WEATHER_SUCCESS = 'REMOVE_WEATHER_SUCCESS';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const WEATHER_LOADING = 'WEATHER_LOADING';

const OPENWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?q=" 

//This method check if the localstorage contain an array called weather.
//If not, it creates an empty array
export function checkStorageIntegrity(){
    let storage = localStorage.getItem("weather")
    if (storage === null || storage === undefined){
        let emptyStorage = []
        localStorage.setItem("weather",JSON.stringify(emptyStorage))
    }
}

//This method retrieve all the widgets stored in the localstorage and set them in the react store
export function restoreStorage(){
    checkStorageIntegrity()
    return (dispatch, getState) =>{
        if(getState().weather.allIds.length === 0){
            let storage = JSON.parse(localStorage.getItem("weather"))
            storage.map(widgetId =>{
                let city = widgetId.split('_')[0]
                let country = widgetId.split('_')[1]
                let weather = {
                    city : city,
                    country : country,
                    data : null
                }
                dispatch(weatherLoading())
                dispatch(addWidgetSuccess(weather))
            })
        }
    }
}

//This method is call to fetch data from openWeather API
export function fetchWeather() {
    return (dispatch, getState) =>{
        dispatch(weatherLoading())
        getState().weather.allIds.map(widgetId =>{
            axios.get(OPENWEATHER_URL + getState().weather.byId[widgetId].city + ","+ getState().weather.byId[widgetId].country + "&appid=" + process.env.REACT_APP_API_KEY +"&units=metric")
            .then(res =>{
                
                dispatch(fetchWeatherSuccess(widgetId,res.data))
            })
            .catch(err =>{
                console.log(err)
            })
        })
    }
}

//Add a new widget 
export function addWidget(city, country) {
    let weather = {
        city : city,
        country : country,
        data : null
    }
    
    let storage = JSON.parse(localStorage.getItem("weather"))

    storage.push(city + "_" + country)
    localStorage.setItem("weather",JSON.stringify(storage))

    return dispatch => {
        dispatch(weatherLoading())
        dispatch(addWidgetSuccess(weather))
    };   
}

//Remove a widget
export function removeWidget(widgetId) {

    let storage = JSON.parse(localStorage.getItem("weather"))

    storage.splice(storage.indexOf(widgetId),1)
    localStorage.setItem("weather",JSON.stringify(storage))

    return dispatch => {
        dispatch(weatherLoading())
        dispatch(removeWidgetSuccess(widgetId))
    };   
}


export const addWidgetSuccess = (weather) => ({
    type: ADD_WEATHER_SUCCESS,
    payload: {weather}
});

export const fetchWeatherSuccess = (widgetId, data) => ({
    type: FETCH_WEATHER_SUCCESS,
    payload: {widgetId, data}
});

export const removeWidgetSuccess = (widgetId) => ({
    type: REMOVE_WEATHER_SUCCESS,
    payload: {widgetId}
});

export const weatherLoading = () => ({
    type: WEATHER_LOADING,
    payload: {}
});