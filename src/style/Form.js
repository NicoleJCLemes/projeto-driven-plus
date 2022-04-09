import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        background: #FFFFFF;
        border-radius: 8px;
        width: 100%;
        height: 52px;
        border: none;
        padding-left: 14px;
        font-size: 15px;

        &&::placeholder {
            font-size: 14px;
            line-height: 16px;
            color: #7E7E7E;
        }
    }

    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        color: #FFFFFF;
        width: 100%;
        text-align: center;
        margin-top: 24px;
    }

    .dark-space {
        width: 299px;
        height: 14px;
        margin: 49px 38px;
    }

    .opacity {
        opacity: 0.7;
    }

    div {
        display: flex;
        justify-content: space-between;

        input {
            width: 48.8%;
            margin-bottom: 4px;
        }
    }

`
export default Form;