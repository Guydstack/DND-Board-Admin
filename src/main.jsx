import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../src/context/AuthContext.jsx';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { registerLicense } from '@syncfusion/ej2-base'

const queryClient = new QueryClient()
registerLicense(import.meta.env.VITE_SYNCFUTHION_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ChakraProvider>
        <App />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </AuthProvider>
</QueryClientProvider>
);
