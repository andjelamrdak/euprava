import axios from "axios";
import React, { useState } from "react";
import { Dropdown, Panel, Placeholder } from "rsuite";

function Card(props) {
  const { user } = props;

  const [modal, setModal] = useState(null);

  const changeProp =  async (user, propName) => {
      console.log('aaa')
    await axios.patch('/admin/user/' + user.id, { [propName]: !user[propName] });
  }

  return (
    <Panel class {...props} bordered header={user?.firstName + " " + user?.lastName}>
      <Placeholder />
      <Dropdown title="Opcije">
        <Dropdown.Item onClick={() => changeProp(user, "blocked")}>{!user?.blocked ? "Blokiraj" : "Odblokiraj"}</Dropdown.Item>
        <Dropdown.Item>Obrisi</Dropdown.Item>
        <Dropdown.Item>Dodaj vakcinu</Dropdown.Item>
        <Dropdown.Item>Proveri kazneni registar</Dropdown.Item>
      </Dropdown>
    </Panel>
  );
}

export default Card;
