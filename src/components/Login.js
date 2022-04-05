import logo from '../assets/logo.png';
import styled from 'styled-components';
import Form from '../style/Form';
import Button from '../style/Button'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <Logo src={logo} alt="driven plus" />
            <Form>
                <input type='email' placeholder='E-mail' />
                <input type='password' placeholder='Senha' />
                <Button>ENTRAR</Button>
                <Link to="/sign-up"><p>Não possuí uma conta? Cadastre-se</p></Link>
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