import Form from "../style/Form";
import Button from "../style/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function SignUp() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    function login(e) {
        e.preventDefault();
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
        promise.catch(() => alert("Não foi possível realizar o cadastro."));
    }


    return (
        <Form onSubmit={login}>
            <div></div>
            <input type='text' placeholder='Nome' required onChange={(e) => setName(e.target.value)} />
            <input type='number' placeholder='CPF' required onChange={(e) => setCpf(e.target.value)} />
            <input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">CADASTRAR</Button>
            <Link to="/"><p>Já possuí uma conta? Entre</p></Link>
        </Form>
    )
}

export default SignUp;