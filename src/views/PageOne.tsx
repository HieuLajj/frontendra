import { isMobile } from 'react-device-detect';
import React from "react";
import styled from "styled-components";
import tw from "twin.macro"
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect } from 'react';

const PageOneContainer = styled.div`
    ${tw`
    flex
    w-screen
    h-screen   
    `}
`

const PageOneStyle = styled.div`
    ${tw`
    text-9xl
    w-screen
    h-screen
    text-black
    flex
    items-center
    justify-center
    text-center
    font-extrabold
    uppercase
    `}
`

export interface IPageOneProps {

}

const PageOne: React.FunctionComponent<IPageOneProps> = () => {
    const { unityProvider } = useUnityContext({
        loaderUrl: "Build/export3.loader.js",
        dataUrl: "Build/export3.data",
        frameworkUrl: "Build/export3.framework.js",
        codeUrl: "Build/export3.wasm",
    });
    //0.95
    
 
    return(
       <>
        <PageOneContainer id="page1">
            <PageOneStyle>  
                <Unity unityProvider={unityProvider} 
                    style={{ width: 1094.4, height: 615.6, marginTop: 80}}
                />
            </PageOneStyle>
        </PageOneContainer>
       </>
    )
}
export default PageOne
// var rect = canvas.getBoundingClientRect();