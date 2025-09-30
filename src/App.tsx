import React from "react";
import GlobalStyle from './styles/global';
import AppProvider from './hooks';
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"



const App: React.FC = () => (
  <>
  <BrowserRouter>
      <AppProvider>       
          <AppRoutes /> 
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  </>
  
)

export default App;
