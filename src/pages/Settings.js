import Sidebar from '../components/Sidebar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState,useEffect } from 'react';
import countries from '../assets/utils/countries'
import {addWidget, removeWidget,restoreStorage} from '../actions/weatherAction'
import { connect } from "react-redux";




function Settings(props){
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("FR");

  useEffect(() => {
    props.dispatch(restoreStorage())
  });

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleAdd = () => {
    if(city !== "" && country !== ""){
      if(! props.widgets.allIds.includes(city+"_"+country)){
        props.dispatch(addWidget(city,country))
      }
    }
  };

  const handleRemove = (widgetId) =>{
    props.dispatch(removeWidget(widgetId))
  }
  
  return (
    <div className="home">
      <Sidebar></Sidebar>
      <div className="mainPanel col-md-10 h-100 pt-5 overflow-auto">
        <div className="row h-75">
          <div className="col-md-12 h-100">
            
            <TableContainer component={Paper} className="h-100">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell> Country code </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.widgets.allIds.map(widgetId =>{
                    
                    return(
                      props.widgets.byId[widgetId] !== undefined ?
                      (
                      <TableRow key={widgetId}>
                        <TableCell >{props.widgets.byId[widgetId].city}</TableCell>
                        <TableCell >{props.widgets.byId[widgetId].country}</TableCell>
                        <TableCell ><button type="button" class="btn btn-danger" onClick={() =>{handleRemove(widgetId)}}>Remove widget</button></TableCell>
                      </TableRow>
                      ):(null)
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div> 
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-md-12">
            <Paper elevation={3} className="p-3">
              <div className="d-flex justify-content-between">
                <h2>Add a widget</h2>
                <button type="button" class="btn btn-success" onClick={handleAdd}>Add widget</button>
              </div>
              
              <TextField id="city" label="City" className="w-100 mb-4" onChange={handleChangeCity}/>
              <Autocomplete
                id="country-select-demo"
                options={countries}
                autoHighlight
                onChange={(event, newValue) => {
                  if(newValue !== null){
                    setCountry(newValue.code);
                  }else{
                    setCountry("FR");
                  }
                  
                }}
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                  <span>
                    {option.label} ({option.code})
                  </span>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  widgets: state.weather,
  loading: state.weather.loading,
  
});
   
  export default connect(mapStateToProps)(Settings);