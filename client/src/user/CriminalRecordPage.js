import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'rsuite'

export default function CriminalRecordPage() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/criminalProceeding').then(res => {
      setData(res.data);
    })
  }, [])

  return (
    <Container className='main'>
      <h2>Vasi sudski procesi</h2>
      <Table
        style={{ width: '100%' }}
        data={data}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Pocetak sudjenja</Table.HeaderCell>
          <Table.Cell dataKey='beginDate' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Kraj sudjenja</Table.HeaderCell>
          <Table.Cell dataKey='endDate' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Krivicno delo</Table.HeaderCell>
          <Table.Cell dataKey='accusation' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Odluka</Table.HeaderCell>
          <Table.Cell dataKey='judgment' />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Oslobadjajuca</Table.HeaderCell>
          <Table.Cell >
            {
              e => e?.convicted ? 'Da' : 'Ne'
            }
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Kazna</Table.HeaderCell>
          <Table.Cell dataKey='severity' />
        </Table.Column>
      </Table>
    </Container>
  )
}
