// BurgerButton.jsx
import React, { useState } from "react";
import styled from "styled-components";



//-----------------------------------

const BurgerButtonWrapper = styled.button`
  width: 20px;
  height: 40px;
  border: none;
  background: none;
  position: relative;
  cursor: pointer;
`;

const Line1 = styled.div`
  width: 20px;
  height: 2px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.3s;
  border-radius: 2px;
  ${({ isActive, rotation, spacing }) => `
    transform:  rotate(${isActive ? rotation : 0}deg) translateY(${isActive ? -spacing / 8 : 5}px);
  `}
`;

const Line2 = styled.div`
  width: 20px;
  height: 2px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.3s;
  border-radius: 2px;

  ${({ isActive, rotation }) =>
    isActive ? `transform: rotate(${rotation}deg);` : "transform: rotate(0);"}
`;

//----------------------------------------



const BurgerButton = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  




  return (
    <BurgerButtonWrapper className={isActive ? "active" : ""} onClick={toggleMenu}>
      <Line1 isActive={isActive} rotation={45} spacing={-4} />
      <Line2 isActive={isActive} rotation={-45} />
    </BurgerButtonWrapper>
  );
};





export default BurgerButton;
