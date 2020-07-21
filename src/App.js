import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";


const Contenedor = styled.div`
  max-width: 900px;
  margin: 5rem auto 5rem;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap:5rem;
  }
`;

const Imagen = styled.img`
  max-width: 60%;
  border-radius:50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const Heading = styled.h1`
  font-family: 'Bungee', cursive;
  color:#374955;
  text-align:left;
  font-weight:700;
  font-size:40px;
  margin-bottom:50px;

  &::after{
    content:"";
    width:200px;
    height:6px;
    background-color:#c7b198;
    display: block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      if (moneda === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      const urlIcon = resultado.data.RAW[criptomoneda][moneda].IMAGEURL;
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        setIcon(`https://cryptocompare.com/${urlIcon}`)
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000);
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda])

  const componente = (cargando)
    ? <Spinner />
    : <Cotizacion
      resultado={resultado}
    />


  return (
    <Contenedor>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setCriptomoneda={setCriptomoneda}
          setMoneda={setMoneda}
        />
      </div>
      <div>
        <Imagen
          src={
            !icon
              ? imagen
              : icon
          }
          alt="imagen crypto"
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
