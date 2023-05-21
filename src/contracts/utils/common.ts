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
    CROWD_SALE: {80001: '0xD81b86f4d9dF8FD1822149C8454e11A37807C0Bb', 137: ''},
    USDT: {80001: '0x062E565224cf749DccFC8ACCec1f63a08b6124Db', 137: ''},
  }