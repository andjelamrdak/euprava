import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'rsuite'

export default function VaccinePage() {

  const [vaccines, setVaccines] = useState([])

  useEffect(() => {
    axios.get('/vaccines').then(res => {
      setVaccines(res.data);
    })
  }, [])

  return (
    <Container className='main'>
      <h2>Vase vakcinacije</h2>
      <Table
        style={{ width: '100%' }}
        data={vaccines}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Datum vakcinacije</Table.HeaderCell>
          <Table.Cell dataKey='dateOfVaccintaion' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Protiv bolesti</Table.HeaderCell>
          <Table.Cell dataKey='disease' />
        </Table.Column>
      </Table>
    </Container>
  )
}
