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
                <div id="canvas_container">
                    <canvas id="pdf_renderer"></canvas>
                </div>
                
                
        
            </div>
 
            <script src="/pdfDashboard.js"></script>
            <div id="pdf_data_row" data-row="[[&quot;Musicals&quot;,40,28.6,6], ...]"></div>


        
        </div>
    );
};
