import React from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import { ApplicationBox } from './ApplicationBox';
import useSWR from 'swr';
import { useState } from 'react';
import axios from 'axios';
import store from '../redux/store';
import { device } from '../devices';

const { colors, fonts } = theme;

const PdfData = styled.datalist`
    width: 100%;
`;

const PdfBox = styled.div`
/* Create two equal columns that floats next to each other */

    float: left;
    width: 50%;
    padding: 10px;
    height: 100%;
`;

const CenterAlign = styled.p`
    text-align: center;
`;




export const Dashboard = ({}) => {
    const [inputValue, setInputValue] = useState('');
    const applicationTypes = useSWR(
        process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getOfferTypes/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;


    const [val, setVal] = useState();

    const unsubscribe = store.subscribe(() => {
            // @ts-ignore
        setVal(store.getState().state.typeId);
    });


    const [postsFiltered, setPosts] = useState([]);

    
    let posts = useSWR(
             // @ts-ignore
        store.getState().state != undefined && store.getState().state.typeId != -1
            ? process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getSpecificOffers/' +
                //@ts-ignore
                  store.getState().state.typeId
            : process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getAllOffers/',
        (url: string) => axios(url).then((r) => {
            setPosts(r.data);
            return r.data}),
    ).data;
    console.log(posts);
    if (typeof window !== "undefined") {
        // TODO: only posts of the last x month from today - starting with (sort) newest offers first
        const myJson = JSON.stringify(posts);
        localStorage.setItem("allPDFdata", myJson);
        localStorage.setItem("pdfPath", process.env.NEXT_PUBLIC_API_ADRESS);
    }
    //use localStorage.getItem("allPDFdata");
    
    return (
        <div>
            <script
                src="http://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.min.js">
            </script>
        
            <div id="my_pdf_viewer">
                <PdfBox id="canvas_container">
                    <canvas id="pdf_renderer"></canvas>
                </PdfBox>
                <script src="/qrcode.min.js"></script>
                <PdfBox>
                    <CenterAlign># # #</CenterAlign>
                    <CenterAlign>Dieser QR-Code kann verwendet werden, um direkt auf das PDF-Dokument zu navigieren!</CenterAlign>
                    <CenterAlign>Diese Seite bzw. Dokumente sind nur intern im Schulnetz erreichbar.</CenterAlign>
                    <CenterAlign>Daher muss die Verbindung mit WLAN aktiviert sein!</CenterAlign>
                    <CenterAlign># # #</CenterAlign>
                    <div id="qrcode"></div>
                </PdfBox>
            </div>
 
            <script src="/pdfDashboard.js"></script>
            <div id="pdf_data_row" data-row="[[&quot;Musicals&quot;,40,28.6,6], ...]"></div>


        
        </div>
    );
};
