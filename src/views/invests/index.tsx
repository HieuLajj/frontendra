declare var window: any;
import React from 'react'
import {Flex, Heading, SimpleGrid, Spacer, useDisclosure, Box} from'@chakra-ui/react';
import PageOne from '../PageOne';
import PageTwo from '../PageTwo';
import Footer from '@/src/components/Footer';
import { ConnectWallet, SuccessModal } from '../../components';
import { IPackage, IRate, IWalletInfo, TOKEN } from '../../_types_';
import { ethers } from "ethers";
import { packages } from '@/src/constants';
import InvestCard from './components/InvestCard';
// import { getCrowdSaleAddress } from "../../utils/getAddress";
import CrowSaleContract from '@/src/contracts/CrowdSaleContract';
import { getCrowdSaleAddress } from '@/src/contracts/utils/getAddress';
import UsdtContract from '@/src/contracts/UsdtContract';
import Navbar from '@/src/components/Navbar';
export default function HomeView(){
    const [rate, setRate] = React.useState<IRate>({bnbRate: 0, usdtRate: 0});
    const [pak, setPak] = React.useState<IPackage>();
    const [wallet, setWallet] = React.useState<IWalletInfo>();
    const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [txHash, setTxHash] = React.useState<string>();
    const {isOpen, onClose, onOpen} = useDisclosure();

    const onConnectMetamask = (address: string, bnbBalance: number, providerWeb3: ethers.providers.Web3Provider) =>{
        setWallet({ address, bnb: bnbBalance });
        setWeb3Provider(providerWeb3);
    }  
    const getRate = React.useCallback(async() => {
        const crowdContract = new CrowSaleContract();
        const bnbRate =  await crowdContract.getBnbRate();
        const usdtRate = await crowdContract.getUsdtRate();  
        setRate({bnbRate, usdtRate});
    }, []);
    React.useEffect(() => {
        getRate();
    }, [getRate]);

    const handleBuyIco = async(pk: IPackage) => {
        if (!web3Provider) return;
            setPak(pk);
            setIsProcessing(true);
            let hash ='';
            const crowdContract = new CrowSaleContract(web3Provider);
            if (pk.token === TOKEN.USDT) {
                const usdtContract = new UsdtContract(web3Provider);
                await usdtContract.approve(crowdContract._contractAddress, pk.amount * rate.bnbRate);
                hash = await crowdContract.drawBNB(pk.amount);
            } else {
                console.log("BNB");
                hash = await crowdContract.buyTokenByBNB(pk.amount);
            }
            setTxHash(hash);
            onOpen();
        try {
    
        } catch(er: any) {
    
        }
        setPak(undefined);
        setIsProcessing(false);
    }
    return(
        <Flex
            w={{base:"full",lg:"100%"}}
            flexDirection="column"
        >
            <Navbar connectMM={onConnectMetamask}/>
            <PageOne />
            <div id="page2">
                <div style={{marginLeft:200, marginTop:60, fontSize:30, fontWeight:'bold'}}>Conversion</div>
                <div className="simple-grid-container">
                    <SimpleGrid columns={{ base: 1, lg: 3 }} mt="20px" spacingY="25px" spacing={20}>
                        {packages.map((pk, index) => (
                        <InvestCard
                            pak={pk}
                            key={String(index)}
                            isBuying={isProcessing && pak?.key === pk.key}
                            rate={pk.token === TOKEN.BNB ? rate.bnbRate : 1/rate.usdtRate}
                            walletInfo={wallet}
                            onBuy={() => handleBuyIco(pk)}
                        />
                        ))}
                    </SimpleGrid>
                </div>
            </div>
            <SuccessModal 
                isOpen={isOpen}
                onClose={onClose}
                hash={txHash}
                title="BUY ICO"
            />
            <Footer/>
        </Flex>
    )
}