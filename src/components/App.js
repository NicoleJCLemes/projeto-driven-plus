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

    const [apiData, setApiData] = useState('');
    const savedToken = localStorage.getItem("token");
    const [token, setToken] = useState(savedToken);
    const [membershipId, setMembershipId] = useState(null);
    const [planInfo, setPlanInfo] = useState(null);

    return(
        <UserContext.Provider value={{apiData, setApiData, token, setToken, membershipId, setMembershipId, planInfo, setPlanInfo}}>
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