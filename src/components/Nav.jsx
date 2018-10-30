import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import 'antd/dist/antd.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Input, Icon, DatePicker, Switch, Radio} from 'antd';
import mapstyle from './mapcontrols/mapstyle';
import mapstyle_silver from '././mapcontrols/mapstyle_silver';

class NavBar extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      username: "",
      name: cookies.get('name') || '',
      dateObject:'',
      searchValue:'',
    }
  }
  
  handleLogin = name => {
    this.setState({name: name})
    const { cookies } = this.props;
    cookies.set('name', name, { path: '/' });
  }

  handleLogout = () => {
    this.props.cookies.remove("name");
    this.setState({name: ""});

  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onDateChange = (date) => {
    this.onChange('dateObject',date)
  }

  onInputChange = (input) => {
    this.onChange('searchValue', input.target.value);
  }

  handleChange = address => {
    this.setState({ searchValue:address });
  };

  onSearchClick = () => {
    this.props.handleSearch(this.state.searchValue,this.state.dateObject);
  }
  
  emitEmpty = () => {
    this.searchInput.focus();
    this.setState({ searchValue: '' });
  }

  handleMapStyleChange = (e) => {
    if (e.target.value === 'standard'){
      this.props.map.setOptions({styles:mapstyle})
    } 
    if (e.target.value === 'silver'){
      this.props.map.setOptions({styles:mapstyle_silver})
    }
  }

  render() {
    const { name } = this.state.name;

    let login = "";
    let register = "";

    if(this.state.name !== ""){
      login = (
        <div>
          <div>
            {this.state.name}
          </div>
          <Button onClick={this.handleLogout}>
            Logout
          </Button>
        </div>
      );
    }else {
      login = (
        <div className="Login">
          <Login name={name} login={this.handleLogin}/>
        </div>
      );
      register = (
        <Button>
          <Register login={this.handleLogin}/>
        </Button>
      );
    }

    const navBarSearchStyle = !this.props.mapVisible ? {'display':'none'} : {'display':'block'};
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    return (
      <Navbar>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
            <Switch 
            defaultChecked={false} 
            className='mapswitch'
            onChange={(checked)=>{checked?this.props.setCond('mapVisible',true) : this.props.setCond('mapVisible',false)}}
            />
            {
              <div className='nar-bar-search' style={navBarSearchStyle}>
                <Input
                placeholder="Search address"
                style={{ width: 200 }}
                prefix={<Icon type="search" theme="outlined" className="glass"/>}
                value={this.state.searchValue}
                onChange={this.onInputChange}
                ref={node => this.searchInput = node}
                />
                <DatePicker
                  showTime
                  format="YYYY-MM-DD h:mm:ss a"
                  placeholder="Select date and time"
                  onChange={this.onDateChange}
                />
                <Button onClick={this.onSearchClick}>Search</Button>
                { }
                <RadioGroup defaultValue="a"  onChange={this.handleMapStyleChange}>
                  <RadioButton value="standard">Standard</RadioButton>
                  <RadioButton value="silver">Silver</RadioButton>
                </RadioGroup>
              </div>
          }
          <div className="login">
            {login} {register}
          </div>
      </Navbar>
    );
  }
}

export default withCookies(NavBar);
