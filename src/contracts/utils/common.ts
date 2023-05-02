  export type AddressType  = {
    80001: string;
    137: string;
  }
  
  export enum CHAIN_ID {
    TESTNET = 80001,
    MAINNET = 137,
  }
  
  export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (!env) { return 80001;}
    return parseInt(env);
  }
  
  
  export const getRPC = () => {
    if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
      return process.env.NEXT_PUBLIC_RPC_MAINNET;
    return process.env.NEXT_PUBLIC_RPC_TESTNET;
  }
  export const SMART_ADDRESS = {
    CROWD_SALE: {80001: '0xDb615904BC67E9bF39438b5aB384dC857ABC08f4', 137: ''},
    USDT: {80001: '0xA2E23A5FB2bC40815b5bFf0bE9196b920C3A049e', 137: ''},
  }