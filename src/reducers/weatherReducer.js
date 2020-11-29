import {
    ADD_WEATHER_SUCCESS,
    WEATHER_LOADING,
    REMOVE_WEATHER_SUCCESS,
    FETCH_WEATHER_SUCCESS
  } from '../actions/weatherAction';

  const initialState = {
    allIds : [],
    byId : {},
    loading: false
};

export default function weatherReducer(state = initialState, action) {
  
  switch(action.type) {

    case ADD_WEATHER_SUCCESS :
      
      let newAllIds = state.allIds
      let newById = state.byId

      newAllIds.push(action.payload.weather.city + "_" + action.payload.weather.country)
      newById[action.payload.weather.city + "_" + action.payload.weather.country] = action.payload.weather

      return {
        ...state,
        allIds : newAllIds,
        byId : newById,
        loading : false,
        refreshed : false,
      };
    
    case FETCH_WEATHER_SUCCESS :
      
      let updateById = state.byId

      updateById[action.payload.widgetId].data = action.payload.data

      return {
        ...state,
        byId : updateById,
        refreshed : true,
        loading : false
      };
    
    case WEATHER_LOADING :
  
      return {
        ...state,
        loading : true
      };
    
    case REMOVE_WEATHER_SUCCESS :
      let RemoveAllIds = state.allIds
      let RemoveById = state.byId

      RemoveAllIds.splice(RemoveAllIds.indexOf(action.payload.widgetId),1)
      delete RemoveById[action.payload.widgetId]

      return {
        ...state,
        allIds : RemoveAllIds,
        byId : RemoveById,
        loading : true
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}