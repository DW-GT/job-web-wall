import * as React from 'react';

import { theme } from '../theme';
import { ThemeProvider } from '@emotion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Login } from '../components/Login';
import { AdminOverview } from '../components/AdminOverview';
import { ApplicationAdd } from '../components/ApplicationAdd';
import {Stretcher } from '../components/Stretcher';


const LoginPage = () => (
    <ThemeProvider theme={theme}>
        <Navigation></Navigation>
        <Stretcher>
        <ApplicationAdd></ApplicationAdd>
        </Stretcher>
        <Footer></Footer>
    </ThemeProvider>
);

export default LoginPage;
