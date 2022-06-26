import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar } from "rsuite";
import axios from 'axios'
export default function UserNavigation(props) {
  const [weather, setWeather] = useState(undefined);


  useEffect(() => {
    axios.get('http://www.7timer.info/bin/api.pl?lon=20.47246239&lat=44.772349&product=civillight&output=json', { withCredentials: false })
      .then(res => {
        setWeather(res.data.dataseries[0].temp2m);
      })
  }, [])
  return (
    <Navbar>
      <Navbar.Brand>
        {
          props.user.firstName + ' ' + props.user.lastName
        }
      </Navbar.Brand>
      <Nav appearance="tab">
        <Nav.Item as={NavLink} to="/">
          Licne karte
        </Nav.Item>
        <Nav.Item as={NavLink} to="/vaccine">
          Vakcinacije
        </Nav.Item>
        <Nav.Item as={NavLink} to="/criminal-record">
          Prekrsaji
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        {
          weather && (
            <Nav >
              <Nav.Item>
                Temperatura: {weather.min}C - {weather.max}C
              </Nav.Item>
            </Nav>

          )
        }
        <Nav.Item onClick={props.onLogout} as={Button} >
          Logout
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
