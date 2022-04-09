import Form from "../style/Form";
import Button from "../style/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import styled from 'styled-components';

function SignUp() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    function signUp(e) {
        e.preventDefault();
        setIsLoading(true);
        const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up'
        const promise = axios.post(URL, {
            email,
            name,
            cpf,
            password
        })
        promise.then((response) => {
            console.log(response.data);
            navigate('/')
        });
        promise.catch(() => alert("Não foi possível realizar o cadastro."), setIsLoading(false));
    }


    return isLoading === false ? (
        <Div>
            <Form onSubmit={signUp}>
                <div className="dark-space"></div>
                <Input type='text' placeholder='Nome' required onChange={(e) => setName(e.target.value)} />
                <Input type='number' placeholder='CPF' required onChange={(e) => setCpf(e.target.value)} />
                <Input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">CADASTRAR</Button>
                <Link to="/"><p>Já possui uma conta? Entre</p></Link>
            </Form>
        </Div>
    ) : (
        <Div>
            <Form>
                <div></div>
                <Input className="opacity" type='text' placeholder='Nome' disabled/>
                <Input className="opacity" type='number' placeholder='CPF' disabled/>
                <Input className="opacity" type='email' placeholder='E-mail' disabled/>
                <Input className="opacity" type='password' placeholder='Senha' disabled/>
                <Button disabled type="submit">
                    <ThreeDots color="#FFFFFF" height={13} width={298} />
                </Button>
                <p>Já possui uma conta? Entre</p>
            </Form>
        </Div>
    )
}

const Div = styled.div`
    padding: 0 38px;
`

const Input = styled.input`
    margin-bottom: 16px;
`

export default SignUp;