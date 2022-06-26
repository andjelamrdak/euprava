import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'rsuite'

export default function IdCardsPage() {

  const [idCards, setIdCards] = useState([])

  useEffect(() => {
    axios.get('/id-card').then(res => {
      setIdCards(res.data);
    })
  }, [])

  return (
    <Container className='main'>
      <h2>Vase licne karte</h2>
      <Table
        style={{ width: '100%' }}
        data={idCards}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Datum izdavanja</Table.HeaderCell>
          <Table.Cell dataKey='dateOfIssue' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Mesto izdavanja</Table.HeaderCell>
          <Table.Cell dataKey='placeIfIssue' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Trajanje</Table.HeaderCell>
          <Table.Cell dataKey='duration' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Grad</Table.HeaderCell>
          <Table.Cell dataKey='city' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Adresa</Table.HeaderCell>
          <Table.Cell dataKey='address' />
        </Table.Column>
      </Table>
    </Container>
  )
}
