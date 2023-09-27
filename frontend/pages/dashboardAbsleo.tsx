
import * as React from 'react';

import { Box, Flex } from 'rebass';
import { theme } from '../theme';
import { ThemeProvider } from '@emotion/react';
import Router from 'next/router';
import styled from 'styled-components';
import { Headline } from '../components/Headline';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Applications } from '../components/Applications';
import { Footer } from '../components/Footer';
import {Stretcher } from '../components/Stretcher';
import { DashboardAbsleo } from '../components/DashboardAbsleo';


const DashboardPage = () =>{

    return(
    
    <ThemeProvider theme={theme}>
        <Navigation showNavigationClock={true}></Navigation>
        <Stretcher>
        <DashboardAbsleo></DashboardAbsleo>
        </Stretcher>
        <Footer></Footer>
    </ThemeProvider>
)};

export default DashboardPage;
