import React from "react";
import styled from "styled-components";
import tw from "twin.macro"
import { packages } from '@/src/constants';
import CrowSaleContract from '@/src/contracts/CrowdSaleContract';
import InvestCard from './invests/components/InvestCard';
import { IPackage, IRate, IWalletInfo, TOKEN } from '../_types_';
import {Flex, Heading, SimpleGrid, Spacer, useDisclosure} from'@chakra-ui/react';
const PageTwoContainer = styled.div`
    ${tw`
    `}
`

const PageTwoStyle = styled.div`
    ${tw`
    flex
    items-center
    justify-center
    `}
`

export interface IPageTwoProps {

}

const PageTwo: React.FunctionComponent<IPageTwoProps> = () => {
    const [wallet, setWallet] = React.useState<IWalletInfo>();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [pak, setPak] = React.useState<IPackage>();
    const [rate, setRate] = React.useState<IRate>({bnbRate: 0, usdtRate: 0});
    const getRate = React.useCallback(async() => {
        const crowdContract = new CrowSaleContract();
        const bnbRate =  await crowdContract.getBnbRate();
        const usdtRate = await crowdContract.getUsdtRate();  
        setRate({bnbRate, usdtRate});
    }, []);
    React.useEffect(() => {
        getRate();
    }, [getRate]);
    return(
       <>
        <PageTwoContainer id="page2">
          
                <SimpleGrid columns={{ base: 1, lg: 3 }} mt="50px" spacingY="50px">
                {packages.map((pk, index) => (
                <InvestCard
                    pak={pk}
                    key={String(index)}
                    isBuying={isProcessing && pak?.key === pk.key}
                    rate={pk.token === TOKEN.BNB ? rate.bnbRate : rate.usdtRate}
                    walletInfo={wallet}
                    onBuy={() =>{}}
                />
                ))}
                </SimpleGrid>
        
        </PageTwoContainer>
       </>
    )
}

export default PageTwo