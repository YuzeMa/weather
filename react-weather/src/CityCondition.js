import React from 'react';
import umberella from './icon/icon-umberella.png';
import wind from './icon/icon-wind.png';
import icon_compass from './icon/icon-compass.png';

export default function CityCondition(props) {
  const tempObj = props.data.temp;
  const temp = props.isTempUnitC ? tempObj.C + ' C': tempObj.F + ' F';
  return (
      <div>
        {
          (props.isLoading)?
          <div className="weather-condition__temp">Loading</div>
          :
          <div>
            <div className="weather-condition__location">{props.data.city.city}</div>
            <div style={{textAlign: 'center', fontSize: 14+'px'}}>{props.data.city.state}</div>
            <div className="weather-condition__temp">{temp}</div>
            <div className="weather-condition__desc">
              <div>
                <img src={umberella}/> <span className="citem">{props.data.weather}</span>
              </div>
              <div>
                <img src={wind} /> <span className="citem"> {props.data.wind_kph} km/h</span>
              </div>
              <div>
                <img src={icon_compass} /> <span className="citem">{props.data.wind_dir}</span>
              </div>
            </div>
          </div>
        }
    </div>   
  );
}