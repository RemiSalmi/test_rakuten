import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

 
function Widget(props){
    return (
      <div className="col-md-3 mt-5">
          <Paper elevation={3} className="p-3 d-flex flex-column overflow-hidden h-100">
            <span><i class="fas fa-map-marker-alt mr-1"></i>{props.widgets.byId[props.widgetId].city}, {props.widgets.byId[props.widgetId].country}</span>
    <span className="temperature">{props.widgets.byId[props.widgetId].data !== null ? (props.widgets.byId[props.widgetId].data.main.temp):("NaN")}°C</span>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <span><i className="wi wi-strong-wind mr-1"></i>{props.widgets.byId[props.widgetId].data !== null ? (props.widgets.byId[props.widgetId].data.wind.speed + "m/s"):("NaN")}</span>
                    <span><i className="wi wi-raindrop mr-1"></i>{props.widgets.byId[props.widgetId].data !== null ? (props.widgets.byId[props.widgetId].data.main.humidity + "%"):("NaN")}</span>
                    <span><i className="wi wi-barometer mr-1"></i>{props.widgets.byId[props.widgetId].data !== null ? (props.widgets.byId[props.widgetId].data.main.pressure + " hPa"):("NaN")}</span>
                </div>
                {
                  props.widgets.byId[props.widgetId].data !== null ?
                  (props.widgets.byId[props.widgetId].data.weather[0].icon.slice(-1) === "d" ?
                  (<i className={props.widgets.byId[props.widgetId].data !== null ? ("icon wi wi-owm-day-" + props.widgets.byId[props.widgetId].data.weather[0].id):(null)}></i>)
                  :
                  (<i className={props.widgets.byId[props.widgetId].data !== null ? ("icon wi wi-owm-night-" + props.widgets.byId[props.widgetId].data.weather[0].id):(null)}></i>)
                  )
                  :
                  (null)
                }
            </div>
          </Paper>
      </div>
    );
  };

  const mapStateToProps = (state) => ({
    widgets: state.weather,
    loading: state.weather.loading,
    
  });
   
  export default connect(mapStateToProps)(Widget);