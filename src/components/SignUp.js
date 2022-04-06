import Form from "../style/Form";
import Button from "../style/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from 'axios';
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

function SignUp() {

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const {email, name, cpf, password, setEmail, setName, setCpf, setPassword} = context

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
        console.log(email, name, cpf, password)
        promise.then((response) => {
            console.log(response.data);
            navigate('/')
        });
        promise.catch(() => alert("Não foi possível realizar o cadastro."), setIsLoading(false));
    }


    return isLoading === false ? (
        <Form onSubmit={signUp}>
            <div></div>
            <input type='text' placeholder='Nome' required onChange={(e) => setName(e.target.value)} />
            <input type='number' placeholder='CPF' required onChange={(e) => setCpf(e.target.value)} />
            <input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">CADASTRAR</Button>
            <Link to="/"><p>Já possuí uma conta? Entre</p></Link>
        </Form>
    ) : (
        <Form>
            <div></div>
            <input className="opacity" type='text' placeholder='Nome' disabled/>
            <input className="opacity" type='number' placeholder='CPF' disabled/>
            <input className="opacity" type='email' placeholder='E-mail' disabled/>
            <input className="opacity" type='password' placeholder='Senha' disabled/>
            <Button disabled type="submit">
                <ThreeDots color="#FFFFFF" height={13} width={298} />
            </Button>
            <p>Já possui uma conta? Entre</p>
        </Form>
    )
}

export default SignUp;