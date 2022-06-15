import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Header, Input, Pagination } from "rsuite";
import TableWrap from "../commons/Table";
import EditUser from "./EditUser";
import VaccineModal from "./VaccineModal";
import { useNavigate } from "react-router-dom";
import CriminalProceedingModal from "./CriminalProceedingModal";
import NewUserModal from "./NewUserModal";

function AdminUsersPage() {
  const basicColumns = [
    {
      fixed: "true",
      header: "ID",
      render: (e) => e.id,
    },
    {
      header: "Email",
      render: (e) => e.email,
    },
    {
      header: "First name",
      render: (e) => e.firstName,
    },
    {
      header: "Last name",
      render: (e) => e.lastName,
    },
    {
      header: "City",
      render: (e) => e.city,
    },
    {
      header: "Id card number",
      render: (e) => e.idCardNumber,
    },
    {
      header: "JMBG",
      render: (e) => e.jmbg,
    },
    {
      header: "Admin",
      render: (e) => (e.admin ? "YES" : "NO"),
    },
    {
      header: "Blocked",
      render: (e) => (e.blocked ? "YES" : "NO"),
    },
  ];

  const actions = [
    {
      render: () => "Izmeni korisnika",
      onclick: (e) => setModal(e),
    },
    {
      render: () => "Dodaj vakcinu",
      onclick: (e) => setVaccineModal(e),
    },
    {
      render: () => "Dodaj u kazneni registar",
      onclick: (e) => setCriminal(e),
    },
  ];

  const pageSizeOptions = [10, 20, 30, 50, 100];

  const [modal, setModal] = useState(null);
  const [vaccineModal, setVaccineModal] = useState(null);
  const [criminal, setCriminal] = useState(null);
  const [newUserModal, setNewUserModal] = useState(null);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const getUsers = async (u) => {
    const res = await axios.get(`/user?search=${search}&page=${page - 1}&size=${pageSize}`, u);
    setUsers(res.data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [search, page, pageSize]);

  return (
    <Container>
      <h2>Admin users list</h2>
      <EditUser modalData={modal} open={!!modal} handleClose={() => setModal(null)} />
      <VaccineModal modalData={vaccineModal} open={!!vaccineModal} handleClose={() => setVaccineModal(null)} />
      <CriminalProceedingModal modalData={criminal} open={!!criminal} handleClose={() => setCriminal(null)} />
      <NewUserModal open={newUserModal} handleClose={() => setNewUserModal(false)} />
      <Button onClick={() => setNewUserModal(true)}>Dodaj novog korisnika</Button>

      <Input onChange={setSearch} placeholder="Pretrazi korisnike" />

      <TableWrap
        onRowClick={(e) => navigate("/user/" + e.id)}
        actions={actions}
        data={users?.content}
        columns={basicColumns}
      />
      <Pagination
        prev
        next
        first
        last
        activePage={page}
        onChangePage={setPage}
        total={users?.totalElements || 0}
        limit={pageSize}
        onChangeLimit={setPageSize}
        maxButtons={3}
        size="md"
        layout={["-", "pager", "limit"]}
        limitOptions={pageSizeOptions}
      />
    </Container>
  );
}

export default AdminUsersPage;
