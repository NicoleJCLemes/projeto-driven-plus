import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from 'styled-components';

function ConfirmationScreen(props) {

    const {confirm, price, clientData, membershipId, setConfirm} = props;
    const {token} = useContext(UserContext);
    const body = {membershipId, ...clientData};
    const navigate = useNavigate();

    function sendData() {
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";
        const promise = axios.post(URL, body, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        promise.then(() => navigate('/home'));
        promise.catch(() => alert('Não foi possível realizar sua assinatura'));
    }

    return confirm === true ? (
            <Div className="confirmation">
                <ion-icon onClick={() => setConfirm(false)} name="close-circle"></ion-icon>
                <div className="box">
                    <p>Tem certeza que deseja assinar o plano Driven Plus (R$ {price})?</p>
                    <div className="buttons">
                        <button onClick={() => setConfirm(false)}>Não</button>
                        <button onClick={sendData}>Sim</button>
                    </div>
                </div>
            </Div>
        ) : (
            <>
            </>
        )
}

const Div = styled.div`
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        background-color: #FFFFFF;
        width: 248px;
        height: 210px;
        background: #FFFFFF;
        border-radius: 12px;
    }

    ion-icon {
        position: absolute;
        top: 24px;
        right: 22px;
        font-size: 35px;
        color: #FFFFFF;
    }

    p {
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        margin: 33px 22px 47px 22px;
    }

    button {
        width: 95px;
        height: 52px;
        border-radius: 8px;
        border: none;
        color: #FFFFFF;
        background-color: #FF4791;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin: 0 22px;

        button:first-child {
            background-color: #CECECE;
        }
    }


`

export default ConfirmationScreen;