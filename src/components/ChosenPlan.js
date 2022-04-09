import { Link, useParams } from "react-router-dom";
import plan from '../assets/plan.png';
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import Form from "../style/Form";
import Button from "../style/Button";
import ConfirmationScreen from "./ConfirmationScreen";

function ChosenPlan() {

    
    const context = useContext(UserContext);
    const {token, setMembershipId, membershipId} = context;
    const {planID} = useParams();
    
    const [planInfo, setPlanInfo] = useState([]);
    const [price, setPrice] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityNumber, setSecurityNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    
    const clientData = {
        cardName,
        cardNumber,
        securityNumber,
        expirationDate
    }
    
    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planID}`
        const promise = axios.get(URL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        promise.then((response) => {
            const priceData = response.data.price;
            const planData = response.data.perks;
            setPlanInfo(planData);
            setPrice(priceData);
            setMembershipId(response.data.id);
        }); // eslint-disable-next-line
    }, [])

    function sign(e) {
        e.preventDefault();
        setConfirm(true);
    }

    return (
        <>
            <Header>
                <Link to="/subscriptions"><ion-icon name="arrow-back"></ion-icon></Link>
                <img src={plan} alt="logo do plano"/>
                <H1>Driven Plus</H1>
            </Header>
            <Main>
                <div className="main">
                    <div className="benefits-header">
                        <ion-icon name="reader-outline"></ion-icon>
                        <h2>Benefícios:</h2>
                    </div>
                    <ol className="benefits">
                        {planInfo.map((info) => {
                            const {id, title} = info
                            return (
                                <li key={id}>{id}. {title}</li>
                            )
                        } )}
                    </ol>
                    <div className="benefits-header">
                        <ion-icon name="cash-outline"></ion-icon>
                        <h2>Preço:</h2>
                    </div>
                        <p>R$ {price} cobrados mensalmente</p>
                </div>
                <Form onSubmit={sign}>
                    <Input type="text" placeholder="Nome impresso no cartão" required value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <Input type="number" placeholder="Digitos do cartão" required value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <div className="inputs">
                        <Input type="number" placeholder="Código de segurança" required value={securityNumber} onChange={(e) => setSecurityNumber(e.target.value)} />
                        <Input type="text" placeholder="Validade" required value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </div>
                    <Button type="submit">ASSINAR</Button>
                </Form>
            </Main>
            <ConfirmationScreen confirm={confirm} price={price} clientData={clientData} membershipId={membershipId} setConfirm={setConfirm} />
        </>
    )
}

const H1 = styled.h1`
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;
`
const Input = styled.input`
    margin-top: 8px;
    font-size: 14px;
    line-height: 16px;

    &::placeholder{
        font-size: 14px;
        line-height: 16px;
    }
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

    padding: 22px 38px 34px 38px ;

    .main {
        display: flex;
        flex-direction: column;
        margin-bottom: 26px;
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