import React from "react";
import styled from "styled-components";
import tw from "twin.macro"
import { TypeAnimation } from "react-type-animation";
import {motion} from 'framer-motion'
import {fadeIn} from './invests/components/variants'
const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`;

const PageContainer = styled.div`
    ${tw`
    flex
    w-screen
    h-screen   
    `}
    background-image: url('1250300.jpg');
`

const PageStyle = styled.div`
    ${tw`
    w-screen
    h-screen
    flex
    items-center
    justify-center
    `}
`
const Left = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
`;
const Img = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;
  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 74px;
  color: #EABD65;
  font-weight: bold;
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;
const PageFirst = () => {
 
    return(
        <PageContainer id="page1">
        <PageStyle>
        <Left>
            <div style={{marginLeft: 80}}>
                <Title>
                    <TypeAnimation sequence={[
                    'ENTERTAINMENT',
                    3000,
                    'TRANSPARENT',
                    3000,
                    'PLAY TO EARN',
                    3000,
                    'EASY',
                    3000
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    />
                </Title>
                <Desc>
                    This is a technology product developed for entertainment and testing purposes. All forms in the game are not real.
                </Desc>
            </div>
        </Left>
        <Right>
            <Img src="game3dnft.png" />
        </Right>
        </PageStyle>
      </PageContainer>
    );
}
export default PageFirst