import logo from '../assets/logo.png';
import styled from 'styled-components';
import Form from '../style/Form';
import Button from '../style/Button'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const {setApiData, setToken} = context;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login(e){
        e.preventDefault();
        setIsLoading(true);

        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login"
        const promise = axios.post(URL, {
            email,
            password
        })

        promise.then((response) => {
            const {data} = response;
            localStorage.setItem("token", `${data.token}`);
            setToken(data.token);
            setApiData(data);
            navigate('/subscriptions');
        })
        promise.catch(() => alert("Não foi possível realizar o seu login."), setIsLoading(false))
    }

    return isLoading === false ? (
        <>
            <Logo src={logo} alt="driven plus" />
            <Form onSubmit={login}>
                <input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit'>ENTRAR</Button>
                <Link to="/sign-up"><p>Não possuí uma conta? Cadastre-se</p></Link>
            </Form>
        </>
    ) : (
        <>
            <Logo src={logo} alt="driven plus" />
            <Form>
                <input className='opacity' type='email' placeholder='E-mail' disabled />
                <input className='opacity' type='password' placeholder='Senha' disabled />
                <Button type='submit' disabled>
                    <ThreeDots color="#FFFFFF" height={13} width={298} />
                </Button>
                <p>Não possuí uma conta? Cadastre-se</p>
            </Form>
        </>
    )
}

const Logo = styled.img`
    margin: 134px auto 62px auto;
    width: 299px;
    height: 49px;
    display: flex;
`

export default Login