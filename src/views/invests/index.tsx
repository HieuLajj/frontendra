//declare var window: any;
import React from 'react'
import {
    Flex,
    SimpleGrid,
    useDisclosure,
    Image
} from'@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import PageOne from '../PageOne';
import PageFirst from '../PageFirst';
import { useState, useEffect } from 'react';
import Footer from '@/src/components/Footer';
import { ConnectWallet, SuccessModal } from '../../components';
import { IPackage, IRate, IWalletInfo, TOKEN } from '../../_types_';
import { ethers } from "ethers";
import { packages } from '@/src/constants';
import InvestCard from './components/InvestCard';
import CrowSaleContract from '@/src/contracts/CrowdSaleContract';
import UsdtContract from '@/src/contracts/UsdtContract';
import Navbar from '@/src/components/Navbar';
import { Unity, useUnityContext } from "react-unity-webgl";
export default function HomeView(){
    // const { unityProvider } = useUnityContext({
    //     loaderUrl: "Build/export3.loader.js",
    //     dataUrl: "Build/export3.data",
    //     frameworkUrl: "Build/export3.framework.js",
    //     codeUrl: "Build/export3.wasm",
    // });
    const { unityProvider } = useUnityContext({
        loaderUrl: "Build/export3.loader.js",
        dataUrl: "Build/export3.data",
        frameworkUrl: "Build/export3.framework.js",
        codeUrl: "Build/export3.wasm",
        streamingAssetsUrl: "StreamingAssets",
    });
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
        // console.log(window.innerWidth+"Ffff");
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

    const aspectRatio = 16 / 9;
    let [width, setWidth] = useState(1152);
    let [height, setHeight] = useState(648);

    useEffect(() => {
    function handleResize() {
        const newWidth = isMobile ? window.screen.width : window?.innerWidth;
        const newHeight = Math.floor(newWidth / aspectRatio);
        console.log(newWidth);
        if(newWidth<=1153 || newHeight<=649){
            setWidth(newWidth);
            setHeight(newHeight); 
        }else{
            setWidth(1152);
            setHeight(648); 
        }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, [aspectRatio, isMobile]);


    return(
        <Flex
            w={{base:"full",lg:"100%"}}
            flexDirection="column"
        >
            <Navbar connectMM={onConnectMetamask}/>
            <PageFirst/>
            <div style={{ marginLeft:100, marginTop:20, display: "flex", alignItems: "center" }}>
                <Image
                    src="vecteezy_nft-gaming-3d-illustration_13391050_316.png"
                    width={50}
                    height={50}
                    objectFit="contain"
                />
                <div style={{ marginLeft: 20, fontSize: 30, fontWeight: "bold",color: "#EABD65" }}>
                    Game
                </div>
            </div>
            <div id ="page2">
                <div className="simple-grid-container">
                    <Unity unityProvider={unityProvider} 
                        style={{width, height, marginTop: 65}}
                    />
                </div>
            </div>
            <div id="page3">
                <div style={{ marginLeft:100, marginTop:60, display: "flex", alignItems: "center" }}>
                <Image
                    src="vecteezy_cryptocurrency-exchange-app-3d-illustration_13391043_710.png"
                    width={50}
                    height={50}
                    objectFit="contain"
                />
                <div style={{ marginLeft: 20, fontSize: 30, fontWeight: "bold",color: "#EABD65" }}>
                    Store
                </div>
                </div>
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
    );
    // return(
      
    //     <Flex
    //         w={{base:"full",lg:"100%"}}
    //         flexDirection="column"
    //     >
    //         <Navbar connectMM={onConnectMetamask}/>

    //         <PageFirst/>

    //         <div style={{ marginLeft:100, marginTop:20, display: "flex", alignItems: "center" }}>
    //             <Image
    //                 src="vecteezy_nft-gaming-3d-illustration_13391050_316.png"
    //                 width={50}
    //                 height={50}
    //                 objectFit="contain"
    //             />
    //             <div style={{ marginLeft: 20, fontSize: 30, fontWeight: "bold",color: "#EABD65" }}>
    //                 Game
    //             </div>
    //         </div>
    //         <div id ="page2">
    //             <div className="simple-grid-container">
    //             <Unity unityProvider={unityProvider} 
    //                 // style={{ width, height, marginTop: 80}}
    //                 style={{width, height, marginTop: 65}}
    //             />
    //              </div>
    //         </div>
            

    //         <div id="page3">
    //             <div style={{ marginLeft:100, marginTop:60, display: "flex", alignItems: "center" }}>
    //             <Image
    //                 src="vecteezy_cryptocurrency-exchange-app-3d-illustration_13391043_710.png"
    //                 width={50}
    //                 height={50}
    //                 objectFit="contain"
    //             />
    //             <div style={{ marginLeft: 20, fontSize: 30, fontWeight: "bold",color: "#EABD65" }}>
    //                 Store
    //             </div>
    //             </div>
    //             <div className="simple-grid-container">
    //                 <SimpleGrid columns={{ base: 1, lg: 3 }} mt="20px" spacingY="25px" spacing={20}>
    //                     {packages.map((pk, index) => (
    //                     <InvestCard
    //                         pak={pk}
    //                         key={String(index)}
    //                         isBuying={isProcessing && pak?.key === pk.key}
    //                         rate={pk.token === TOKEN.BNB ? rate.bnbRate : 1/rate.usdtRate}
    //                         walletInfo={wallet}
    //                         onBuy={() => handleBuyIco(pk)}
    //                     />
    //                     ))}
    //                 </SimpleGrid>
    //             </div>
    //         </div>
    //         <SuccessModal 
    //             isOpen={isOpen}
    //             onClose={onClose}
    //             hash={txHash}
    //             title="BUY ICO"
    //         />
    //         <Footer/> 
    //    </Flex>
      
    // )
}