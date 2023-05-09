import { ChakraProvider, ThemeConfig, extendTheme, ComponentStyleConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const Button: ComponentStyleConfig = {
  variants: {
    'primary': {
      bg: '#8246E5',
      borderRadius: "8px",
      //color: "#6a5809",
      fontWeight: 'bold',      
      //padding: "25px 30px",
      //padding: "15px 20px",
      padding: "5px 10px",
      border: "1px solid #8246E5",
      fontSize: "12px",
      height: '35px',
      width: '100px',
    },  
    'outline': {      
      borderRadius: "5px",
      color: "#fedf56",
      fontWeight: 'bold',      
      padding: "12px 36px",
      border: "1px solid rgba(254,223,86,.6) !important", 
    },   
  }
}


const components = {
  Button,
}

const theme = extendTheme({
  config,
  components
});

export default theme;