import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, FlexboxGrid } from 'rsuite';
import AdminApp from './admin/AdminApp';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import { AppContext } from './hooks/useAppContext';
import UserApp from './user/UserApp';
import 'rsuite/dist/rsuite.min.css'

axios.defaults.baseURL = 'https://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading || !!user) {
      return;
    }
    axios.get('/auth/check').then(res => {
      setUser(res.data);
    }).finally(() => {
      setLoading(false);
    })
  }, [loading, user])

  const login = async (u) => {
    const res = await axios.post('/auth/login', u);
    setUser(res.data);
  }
  const register = async (u) => {
    const res = await axios.post('/auth/register', u);
    setUser(res.data);
  }

  const logout = async () => {
    await axios.post('/user/logout');
    setUser(undefined);
  }

  if (loading) {
    return (
      <div></div>
    );
  }
  if (!user) {
    return (
      <Container>
        <FlexboxGrid className='pt' justify='space-around'>
          <FlexboxGrid.Item colspan={8}>
            <BrowserRouter>
              <Routes>
                <Route path='/register' element={<Register onSubmit={register} />} />
                <Route path='*' element={<Login onSubmit={login} />} />
              </Routes>
            </BrowserRouter>
          </FlexboxGrid.Item>

        </FlexboxGrid>
      </Container>
    )
  }

  if (user.admin) {
    return (
      <AppContext.Provider value={{ user, setUser }}>
        <AdminApp user={user} onLogout={logout} />
      </AppContext.Provider>
    )
  }
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <UserApp user={user} onLogout={logout} />
    </AppContext.Provider>
  )
}

export default App;
