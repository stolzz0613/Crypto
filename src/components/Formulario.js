import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#FFF;
    transition:background-color .3s ease; 

    &:hover{
        background-color:#326AC0;
        cursor:pointer;
    }
`

const Formulario = () => {

    const [listaCripto, setListaCripto] = useState([]);

    const MONEDAS = [
        { codigo: "USD", nombre: "Dolar de Estados Unidos" },
        { codigo: "COP", nombre: "Peso Colombiano" },
        { codigo: "EUR", nombre: "Euro" },
        { codigo: "GBP", nombre: "Libra Esterlina" }
    ]
    const [moneda, SelectMoneda, setState] = useMoneda("Elige tu Moneda", "", MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu Criptomoneda", "", listaCripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const resultado = await axios.get(url);
            setListaCripto(resultado.data.Data);
        }
        consultarAPI()
    }, []);

    return (
        <form>
            <SelectMoneda />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;