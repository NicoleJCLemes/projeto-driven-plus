import styled from 'styled-components';
//import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

function Subscriptions() {

    const context = useContext(UserContext);
    const {token} = context;
    const [planData, setPlanData] = useState([]);
    const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
    const promise = axios.get(URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    promise.then((response) => {
        const {data} = response;
        setPlanData(data);
    })

    return (
        <Div>
            <h1>Escolha seu Plano</h1>
            {planData.map((planData) => {
                return (
                    <div className='plan-options' key={planData.id}>
                        <img src={planData.image} alt="imagem do plano" />
                        <p>R$ {planData.price}</p>
                    </div>
                )
            })}
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin: 29px 0 24px 0;
    }

    .plan-options {
        width: 290px;
        height: 180px;
        background: #0E0E13;
        border: 3px solid #7E7E7E;
        box-sizing: border-box;
        border-radius: 12px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
    }

    p {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }
`

export default Subscriptions;