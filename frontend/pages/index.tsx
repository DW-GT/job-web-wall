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



const MainPage = () =>{

    return(
    
    <ThemeProvider theme={theme}>
        <Navigation showNavigationSelectBox={true}></Navigation>
        <Stretcher>
        <Applications ></Applications>
        </Stretcher>
        <Footer></Footer>
    </ThemeProvider>
)};

export default MainPage;
