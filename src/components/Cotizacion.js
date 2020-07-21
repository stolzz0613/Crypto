import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color:#374955;
    background: RGBA(240,236,227,0.7);
    font-family:Arial, Helvetica, sans-serif;
    padding:10px;
    margin-top:20px;
    border-radius:10px;
    max-width:90%;
`;
const Info = styled.p`
    font-size:18px;
    text-align:center;
    span{
        font-weight:bold;
    }
`;
const Precio = styled.p`
    font-size:30px;
    text-align:center;
    span{
        font-weight:bold;
    }
`;

const Cotizacion = ({ resultado }) => {

    if (Object.keys(resultado).length === 0) return null;
    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR * 100}%</span></Info>
            <Info>Última Actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    );
}

export default Cotizacion;