import React from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import { device } from '../devices';

const { colors, fonts } = theme;

const JobDetailsLayout = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 7vh 5vw;
    font-family: ${fonts.primaryFont};
    color: ${colors.primaryBackgroundColor};
    font-weight: bold;
    @media ${device.desktop} {
        padding: 15vh 15vw;
    }
`;

const StyledJobHeadline = styled.h1`
    background: linear-gradient(90.92deg, #ea4328 0.13%, #ffd400 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem;
    width: fit-content;
    margin-bottom: 0.4vh;
`;

const StyledSpaceBar = styled.div`
    width: 60%;
    height: 0.5vh;
    display: block;
    background-color: ${colors.primaryBackgroundColor};
`;

const StyledCompanyName = styled.p`
    text-transform: uppercase;
    margin-bottom: 4vh;
`;

const StyledDates = styled.p`
    line-height: 2rem;
`;

const IframeLayout = styled.div`
    height: 90vw;
    @media ${device.desktop} {
        height: 70vw;
    }
`;

const StyledLink = styled.a`
    display: block;
    margin-top: 20px;
    text-decoration: underline;
    transition: all 200ms;
    :hover {
        background: linear-gradient(90.92deg, #ea4328 0.13%, #ffd400 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

function formatDate(date) {
    date = new Date(date);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}

export const ApplicationDetails = ({ applicationId }) => {
    const applicationTypes = useSWR(
        process.env.NEXT_PUBLIC_API_ADRESS+`/api/application/getOfferTypes/`,
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    const content = useSWR(
        process.env.NEXT_PUBLIC_API_ADRESS+`/api/application/getOffer/` + applicationId,
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    return (
        <JobDetailsLayout>
            <StyledJobHeadline>{content?.name}</StyledJobHeadline>
            <StyledSpaceBar></StyledSpaceBar>
            <StyledCompanyName>{content?.company_name}</StyledCompanyName>
            <StyledDates>
                Erstellt am:{formatDate(content?.creation_date)}
                <br></br>Bis: {formatDate(content?.expire_date)}
            </StyledDates>
            <p>{content?.description}</p>
            <IframeLayout>
                <iframe
                    src={process.env.NEXT_PUBLIC_API_ADRESS+content?.pdf_src + '#view=fit'}
                    width="100%"
                    height="100%"
                ></iframe>
                <StyledLink href={process.env.NEXT_PUBLIC_API_ADRESS+content?.pdf_src} target="_blank">
                    PDF in neuem Tab öffnen
                </StyledLink>
            </IframeLayout>
        </JobDetailsLayout>
    );
};
