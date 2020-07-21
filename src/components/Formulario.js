import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#374955;
    border:none;
    width:100%;
    border-radius:10px;
    color:#FFF;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
    transition:background-color .3s ease; 

    &:hover{
        background-color:#84a9ac;
        cursor:pointer;
        box-shadow: 0px 15px 20px #b4c4b9;
        transform: translateY(-7px);
    }

`

const Formulario = ({ setCriptomoneda, setMoneda }) => {

    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: "USD", nombre: "Dolar de Estados Unidos" },
        { codigo: "COP", nombre: "Peso Colombiano" },
        { codigo: "EUR", nombre: "Euro" },
        { codigo: "GBP", nombre: "Libra Esterlina" }
    ]
    const [moneda, SelectMoneda] = useMoneda("Elige tu Moneda", "", MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu Criptomoneda", "", listaCripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const resultado = await axios.get(url);
            setListaCripto(resultado.data.Data);
        }
        consultarAPI()
    }, []);


    const cotizarMoneda = e => {
        e.preventDefault();
        if (moneda === "" || criptomoneda === "") {
            setError(true);
            return;
        }
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
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