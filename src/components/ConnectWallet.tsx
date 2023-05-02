import React from 'react'
import {Button, ButtonProps} from '@chakra-ui/react';
type Props = {
    onClick: () => void;
};
// interface IProps extends ButtonProps {}
export default function ConnectWallet(props: Props) { 
    return <Button variant="primary" onClick={props.onClick}>Connect wallet</Button>;
 
}