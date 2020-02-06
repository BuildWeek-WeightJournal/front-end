import styled from "styled-components";
import { Form, Field } from "formik";

export const InputForm = styled(Form)`
display: flex;
flex-flow: column nowrap;
width: 500px;
padding: 40 px;
padding-top: 160px;
margin: auto
`;

export const InputField = styled(Field)`
margin: 30px;
`;

export const Button = styled.button`
margin:30px;

`;

export const Div = styled.div`
border: 1px solid #00a35e;
border-radius: 5px;
height: 20px;
`;

export const Title = styled.h1`
`;

export const Subtitle = styled.h2`
`;

export const Notes = styled.p`
`;