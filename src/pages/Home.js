import { connect } from 'react-redux';
import React, {useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import Widget from '../components/Widget'
import {fetchWeather, restoreStorage} from '../actions/weatherAction'

 
function Home(props){

  const {refreshed} = props

  useEffect(() => {
    props.dispatch(restoreStorage())
    props.dispatch(fetchWeather())
    
  },[refreshed]);

  

  return (
    <div className="home">
      <Sidebar></Sidebar>
      <div className="mainPanel col-md-10 h-100 pt-2 overflow-auto">
        <div className="row">
          
          {props.widgets.allIds.length === 0 ?
          (<p className="pt-5 pl-3">You haven't set any widget, go to the setting page first</p>):
          (props.widgets.allIds.map(widgetId =>{
            return(
              <Widget widgetId={widgetId}></Widget>
            )
          }))}
          
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  widgets: state.weather,
  loading: state.weather.loading,
  refreshed: state.weather.refreshed,
  
});
   
export default connect(mapStateToProps) (Home);