import { useParams } from "react-router-dom";
import plan from '../assets/plan.png';
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import axios from 'axios';
import styled from 'styled-components';

function ChosenPlan() {

    const {planID} = useParams();

    const context = useContext(UserContext);
    const {token} = context;

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planID}`
    const promise = axios.get(URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const [planInfo, setPlanInfo] = useState([]);
    const [price, setPrice] = useState("");

    promise.then((response) => {
        const priceData = response.data.price
        const planData = response.data.perks;
        setPlanInfo(planData);
        setPrice(priceData);
    });

    return (
        <>
            <Header>
                <ion-icon name="arrow-back"></ion-icon>
                <img src={plan} alt="logo do plano"/>
                <H1>Driven Plus</H1>
            </Header>
            <Main>
                <div className="main">
                    <div className="benefits-header">
                        <ion-icon name="reader-outline"></ion-icon>
                        <h2>Benefícios:</h2>
                    </div>
                    <ul className="benefits">
                        {planInfo.map((info) => {
                            const {id, title} = info
                            return (
                                <li key={id}>{id}. {title}</li>
                            )
                        } )}
                    </ul>
                    <div className="benefits-header">
                        <ion-icon name="cash-outline"></ion-icon>
                        <h2>Preço:</h2>
                    </div>
                        <p>R$ {price} cobrados mensalmente</p>
                </div>
            </Main>
        </>
    )
}

const H1 = styled.h1`
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;
`
const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    ion-icon {
        color: #FFFFFF;
        position: absolute;
        top: 24px;
        left: 22px;
        font-size: 35px;
    }

    img {
        width: 139.38px;
        height: 95.13px;
        margin-top: 87px;
    }
`

const Main = styled.main`

    padding: 22px 40px 34px 40px ;

    .main {
        display: flex;
        flex-direction: column;
    }

    h2 {
        margin: 0 10px 5px 0;
        color: #FFFFFF;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }

    ion-icon {
        color: #FF4791;
    }

    .benefits {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
    }

    .benefits-header {
        display: flex;
        color: #FFFFFF;
    }

    li, p {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`

export default ChosenPlan;