import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import Subscriptions from './Subscriptions';
import ChosenPlan from './ChosenPlan';
import GlobalStyle from '../GlobalStyle';
import UserContext from '../contexts/UserContext';
import { useState } from 'react';

function App() {
    const [token, setToken] = useState('')
    return(
        <UserContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/subscriptions' element={<Subscriptions />} />
                    <Route path='/subscriptions/:planID' element={<ChosenPlan />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App