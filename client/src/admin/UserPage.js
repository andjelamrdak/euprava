import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Content, Divider, Header, Panel } from "rsuite";
import TableWrap from "../commons/Table";
import CriminalProceedingModal from "./CriminalProceedingModal";

const criminalProceedingColumns = [
  {
    fixed: "true",
    header: "ID",
    render: (e) => e.id,
  },
  {
    header: "beginDate",
    render: (e) => e.beginDate,
  },
  {
    header: "endDate",
    render: (e) => e.endDate,
  },
  {
    header: "accusation",
    render: (e) => e.accusation,
  },
  {
    header: "judgment",
    render: (e) => e.judgment,
  },
  {
    header: "convicted",
    render: (e) => (e.convicted ? "Da" : "Ne"),
  },
  {
    header: "severity",
    render: (e) => e.severity,
  },
];

const vaccineColumns = [
  {
    fixed: "true",
    header: "ID",
    render: (e) => e.id,
  },
  {
    header: "Bolest",
    render: (e) => e.disease,
  },
  {
    header: "Datum vakcinacije",
    render: (e) => e.dateOfVaccintaion,
  },
];

const idCardColumns = [
  {
    fixed: "true",
    header: "ID",
    render: (e) => e.id,
  },
  {
    header: "Datum izdavanja",
    render: (e) => e.duration,
  },
  {
    header: "Trajanje",
    render: (e) => e.dateOfIssue,
  },
  {
    header: "Mesto izdavanja",
    render: (e) => e.placeIfIssue,
  },
  {
    header: "Prebivaliste",
    render: (e) => `${e.address}, ${e.city}`,
  },
]

function UserPage() {
  const criminalProceedingActions = [
    {
      render: () => "Izbrisi rekord",
      onclick: (e) => deleteCriminalRegister(e?.id),
    },
    {
      render: () => "Izmeni rekord",
      onclick: (e) => {
        setCriminalModal({
          ...e,
          userId: params?.id,
          beginDate: new Date(e?.beginDate),
          endDate: e?.endDate ? new Date(e?.endDate) : null,
        });
      },
    },
  ];
  const vaccinesActions = [
    {
      render: () => "Izbrisi vakcinu",
      onclick: (e) => deleteVaccine(e?.id),
    },
  ];

  const idCardActions = [
    {
      render: () => "Izbrisi licnu kartu",
      onclick: (e) => deleteUserIdCard(e?.id),
    },
  ]

  const params = useParams();

  const [user, setUser] = useState(null);

  const [criminalModal, setCriminalModal] = useState(null);

  const getUserData = async () => {
    return await axios.get("admin/user/" + params?.id);
  };

  const deleteVaccine = async (vaccineId) => {
    await axios.delete("vaccines/" + vaccineId);
    getUserData().then((res) => setUser(res?.data));
  };

  const deleteCriminalRegister = async (vaccineId) => {
    await axios.delete("criminalProceeding/" + vaccineId);
    getUserData().then((res) => setUser(res?.data));
  };

  const deleteUserIdCard = async idCardId => {
    await axios.delete('id-card/' + idCardId);
    getUserData().then((res) => setUser(res?.data));
  }

  useEffect(() => {
    getUserData().then((res) => setUser(res?.data));
  }, [params]);

  return (
    <Container style={{ margin: "30px" }}>
      <CriminalProceedingModal
        modalData={criminalModal}
        open={!!criminalModal}
        shouldUpdate
        onSubmit={async () => {
          const res = await getUserData();
          setUser(res?.data)
        }}
        handleClose={() => setCriminalModal(null)}
      />
      <Panel header="Info o korisniku" collapsible bordered shaded defaultExpanded>
        <div>Ime: {user?.firstName}</div>
        <div>Prezime: {user?.lastName}</div>
        <div>Email: {user?.email}</div>
        <div>JMBG: {user?.jmbg}</div>
      </Panel>
      <Divider />
      <Panel header="Info o vakcinama" collapsible bordered shaded>
        <Content>
          <TableWrap onRowClick={(e) => { }} actions={vaccinesActions} data={user?.vaccines} columns={vaccineColumns} />
        </Content>
      </Panel>
      <Divider />

      <Panel header="Info o kriminalnom rekordu" collapsible bordered shaded>
        <Content>
          <TableWrap
            onRowClick={(e) => { }}
            actions={criminalProceedingActions}
            data={user?.criminalProceedings}
            columns={criminalProceedingColumns}
          />
        </Content>
      </Panel>

      <Divider />

      <Panel header="Info o licnim kartama" collapsible bordered shaded>
        <Content>
          <TableWrap
            actions={idCardActions}
            onRowClick={(e) => { }} data={user?.idCards} columns={idCardColumns} />
        </Content>
      </Panel>
      <Divider />
    </Container>
  );
}

export default UserPage;
