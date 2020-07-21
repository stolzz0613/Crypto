import React from 'react';

const Cotizacion = ({ resultado }) => {

    if (Object.keys(resultado).length === 0) return null;
    console.log(resultado)
    return (
        <div>
            <p>El precio es: <span>{resultado.PRICE}</span></p>
            <p>El precio es: <span>{resultado.PRICE}</span></p>
            <p>El precio es: <span>{resultado.PRICE}</span></p>
            <p>El precio es: <span>{resultado.PRICE}</span></p>
            <p>El precio es: <span>{resultado.PRICE}</span></p>

        </div>
    );
}

export default Cotizacion;