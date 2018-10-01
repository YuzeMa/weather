import React, {Component} from 'react';

export default class Forecaster extends Component {
    constructor(props){
        super(props);
        this.state={
            isFiveDays: true
        }
    }

    switchActive(){
        this.setState({isFiveDays: !this.state.isFiveDays});
    }

    render(){
        return (
            <div>
                {
                (this.props.isLoading)?
                <div className="weather-condition__temp">Loading</div>
                :
                <div>
                    {
                        (this.state.isFiveDays)?
                        <div className="forecast__switch">
                            <button className='forecast__switch_0 switch-active' >5 days</button>
                            <button className='forecast__switch_1' onClick={this.switchActive.bind(this)}>10 days</button>
                        </div>
                        :
                        <div className="forecast__switch">
                            <button className='forecast__switch_0' onClick={this.switchActive.bind(this)}>5 days</button>
                            <button className='forecast__switch_1 switch-active'>10 days</button>
                        </div>
                    }
                    <Weather days={this.props.days} isTempUnitC={this.props.isTempUnitC} isFiveDays={this.state.isFiveDays}/>
                </div>
                }
            </div>
        );
    }
}

function Weather (props) {
    let rows = [];
    let days = props.days;
    rows = days.map( day=>{ 
        return <WeatherDay day={day} isTempUnitC={props.isTempUnitC} key={day.id}/>;
    })
    return (
        (props.isFiveDays)?
       <div>{rows.slice(0,5)}</div>
       :
       <div>{rows}</div>
    );
}

function WeatherDay (props) {
    const highTempObj = props.day.high;
    const highTemp = props.isTempUnitC ? highTempObj.celsius + ' C': highTempObj.fahrenheit + ' F';
    const lowTempObj = props.day.low;
    const lowTemp = props.isTempUnitC ? lowTempObj.celsius + ' C': lowTempObj.fahrenheit + ' F';
    return(
        <div className="weather-forecast__row">
        <span className="weather-forecast__day">{props.day.weekday}</span>
        <span className="weather-forecast__icon">
            <img src={props.day.icon}/>
        </span>
        <span className="weather-forecast__high">{highTemp}</span>
        <span className="weather-forecast__low">{lowTemp}</span>
        </div>
        );
}
