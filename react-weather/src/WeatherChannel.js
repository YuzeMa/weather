import React, {Component} from 'react';
import {fetchConditionData, fetchForecastData} from './api/weather';

import CityCondition from './CityCondition';
import Forecaster    from './Forecaster';
import Nav from './Nav';

export default class WeatherChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidInput: true,
            cityConditionLoading: true,
            foreCasterLoading: true,
            isTempUnitC: true,
            condition: {
                city:  {city:'',state:''},
                temp: {C:'',F:''}
            },
            days:  []
        }
    }

    componentDidMount(){
      this.onCityChange('sydney');
    }

    lastId = 4;
    newId = ()=>{
      const id = this.lastId;
      this.lastId+=1;
      return id;
    }
    

    onConditionLoad(data) {
      try{
        const condition = {
          city: {city:data.display_location.city, state:data.display_location.state},
          temp: {C:data.temp_c, F:data.temp_f},
          weather: data.weather,
          wind_dir: data.wind_dir,
          wind_kph: data.wind_kph,
          weather: data.weather
        }
        this.setState({condition,cityConditionLoading: false,isValidInput: true});
      }
      catch(error){
        this.setState({isValidInput: false});
      }
    }

    onForecastLoad(data) {
      try{
        data = data.simpleforecast.forecastday;
        const days = data.map(day=>{
          return{
            weekday:day.date.weekday_short,
            high:day.high,
            low:day.low,
            icon:day.icon_url,
            id:this.newId()};
        })
        this.setState({days,foreCasterLoading:false,isValidInput: true});
      }
      catch(error){
        this.setState({isValidInput: false});
      }
    }

    onCityChange(name){
        fetchConditionData(name, this.onConditionLoad.bind(this));
        fetchForecastData(name,this.onForecastLoad.bind(this));
    }

    tempUniteChange(){
      this.setState({isTempUnitC: !this.state.isTempUnitC});
    }
    
    render() {
      return (
        <main>
          <Nav onNameChange={this.onCityChange.bind(this)} unitChange={this.tempUniteChange.bind(this)} isValidInput={this.state.isValidInput}/>
          <section className='weather-condition'>
            <CityCondition data={this.state.condition} isTempUnitC={this.state.isTempUnitC} isLoading={this.state.cityConditionLoading}/>
          </section>
          <section className='weather-forecast'>
            <Forecaster days={this.state.days} isTempUnitC={this.state.isTempUnitC} isLoading={this.state.foreCasterLoading}/>
          </section>
        </main>
      )
    }
}
