import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'rsuite'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
function AdminStatistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/admin/vaccine-data').then(res => {
            setData(res.data);
        })
    }, [])

    return (
        <Container className='main'>
            <h2 style={{ textAlign: 'center' }}>Vaccine statistics</h2>
            <ResponsiveContainer
                width='100%'
                aspect={16 / 9}
            >
                <BarChart
                    data={data}
                >
                    <XAxis dataKey='userName' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='total' fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default AdminStatistics
