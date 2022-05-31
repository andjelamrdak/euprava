import axios from "axios";
import React, { useEffect } from "react";
import { Container, Header } from "rsuite";

function AdminUsersPage() {
  const [users, setUsers] = React.useState([]);

  const getUsers = async (u) => {
    const res = await axios.get("/user", u);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users?.content);

  return (
    <Container>
      <Header>Admin users list</Header>

      <div>
        {users?.content?.map((user) => (
          <div>{user?.firstName}</div>
        ))}
      </div>
    </Container>
  );
}

export default AdminUsersPage;
