declare var window: any;
import { ethers } from "ethers";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-scroll/modules";
import { IPackage, IRate, IWalletInfo, TOKEN } from '../_types_';
import { ConnectWallet, SuccessModal, WalletInfo } from '../components';
import{Roboto} from '@next/font/google'

import {
  Flex,
  HStack,
  Image
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
const NavbarContainer = styled.div`
  ${tw`
    h-14
    w-screen
    bg-black
    fixed
    z-10
    
    `}
`;

const NavbarStyle = styled.div`
  ${tw`
  h-full
  hover:cursor-pointer
    `}
`;
type MetaProps = {
  connectMM: (address: string, bnbBalance: number, providerWeb3: ethers.providers.Web3Provider) => void;
};


const Navbar= ({ connectMM }: MetaProps) => {
  const [wallet, setWallet] = React.useState<IWalletInfo>();
  const  connectMMfirst = async () => {
    if (window.ethereum) {
      const providerWeb3 = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      );
      await providerWeb3.send("eth_requestAccounts", []);
      const signer = providerWeb3.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const bnbBalance = Number.parseFloat(
          ethers.utils.formatEther(bigBalance)
      );
      setWallet({ address, bnb: bnbBalance });
      connectMM(address,bnbBalance, providerWeb3);
    }
  };

  return ( 
    <>
      <NavbarContainer>
        <NavbarStyle> 
        <Flex h={14}  alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={5} alignItems={"center"}>
            <Image
              ml={5}
              boxSize='30px'
              objectFit='contain'
              src='dice-clipart-md.png'
            />
            {/* <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >  
            </HStack> */}
            <Link activeClass="active" to="page2" spy={true} smooth={true} offset={0} duration={500} className="link">
            <div style={{fontWeight: 'bold', fontSize:16}}> Game </div>
            </Link>
            <Link activeClass="active" to="page3" spy={true} smooth={true} offset={0} duration={500} className="link">
            <div style={{fontWeight: 'bold', fontSize:16}}> Store </div>
            </Link>
          </HStack>
          <div style={{marginRight:60}}>
            {!(wallet) && <ConnectWallet onClick={connectMMfirst}/>}
            {(wallet) &&
                <WalletInfo
                    address={wallet?.address}
                    amount={wallet?.bnb || 0}
                />
            }
          </div> 
        </Flex>
        </NavbarStyle>
      </NavbarContainer>
    </>
  );
};

export default Navbar;