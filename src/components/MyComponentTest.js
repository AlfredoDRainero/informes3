// MyComponent.js
import React from 'react';
import { useMyContext } from '../contexts/MyContext';

function MyComponent() {
  const { data, setData } = useMyContext();

  const handleClick = () => {
    // Actualiza los datos en el contexto
    setData("Nuevos datos");
  };

  return (
    <div>
      <p>Datos en MyComponent: {data}</p>
      <button onClick={handleClick}>Cambiar Datos</button>
    </div>
  );
}

export default MyComponent;
