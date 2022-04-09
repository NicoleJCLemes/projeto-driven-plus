import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from 'styled-components';
import Button from "../style/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {

    const {apiData, token, planInfo} = useContext(UserContext);
    console.log(planInfo);
    const {perks, image} = planInfo.membership;
    console.log(perks);
    const navigate = useNavigate();

    function deletePlan() {
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/`;
        const promise = axios.delete(URL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        promise.then(() => navigate("/subscriptions"))
    }

    return planInfo === undefined ? (
        <p>Loading...</p>
    ) : (
        <>
        <Header>
            <img src={image} alt="logo" />
            <ion-icon name="person-circle-sharp"></ion-icon>
        </Header>
        <Main>
            <h1>Olá, {apiData.name}</h1>
            <ul>
                {perks.map((perk) => {
                    return (
                        <li key={perk.id}>
                            <a target="_blank" rel="noreferrer" href={perk.link}><Button>{perk.title}</Button></a>
                        </li>
                    )
                })}
            </ul>
        </Main>
        <Footer>
            <Button onClick={() => navigate('/subscriptions')}>Mudar plano</Button>
            <Button onClick={deletePlan}>Cancelar plano</Button>
        </Footer>
        </>
    )
}

const Header = styled.header`
    height: 83px;
    position: relative;

    img {
        width: 74.52px;
        height: 50.87px;
        position: absolute;
        top: 32px;
        left: 38px;
    }

    ion-icon {
        color: #FFFFFF;
        font-size: 35px;
        position: absolute;
        top: 22px;
        right: 22px;
    }
`

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        margin: 12px 0 53px 0;
    }
`

const Footer = styled.footer`

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 136px;
    width: 100%;
    position: absolute;
    bottom: 0;

    button:last-child {
        background-color: #FF4747;
        margin-bottom: 4px;
    }

    button {
        margin: 0;
    }
`

export default Home;