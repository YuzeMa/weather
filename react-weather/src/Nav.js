import React,{Component} from 'react';
import {Icon} from 'react-fa';

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            unit: 'C'
        }
    };

    onSubmit(e){
        e.preventDefault();
        this.props.onNameChange(this.state.name);
        this.setState({name: ""})
    }

    onNameChange(e){
        this.setState({name: e.target.value.toLowerCase()})
    }

    onUnitChange(e){
        e.preventDefault();
        let curUnit = (this.state.unit === 'C') ? 'F':'C';
        this.setState({unit: curUnit});
        this.props.unitChange();
    }


    render(){
        return(
            <nav>
                <div style={{flex:1}}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input className="search-input" value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                        <button className="search-btn" type="submit"><Icon name="search" /></button>

                        <button className="temp-switch" onClick={this.onUnitChange.bind(this)}>
                        <i className="fa fa-thermometer-empty" aria-hidden="true" style={{paddingRight:5+'px'}}></i>
                        {this.state.unit}
                        </button>
                        {
                        (this.props.isValidInput) ?
                        <p> </p>
                        :
                        <p>Error! Invalid Input</p>
                        }
                    </form>
                </div>
            </nav>
        );
    }
}