import React from 'react';
import { Heading, Box, Image } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';
import { device } from '../devices';

const { colors, fonts } = theme;

type Props = {
    applicationHeadline: string;
    applicationText: string;
    companyName: string;
    startDate: string;
    applicationType: string;
    endDate?: string;
    applicationId: number;
};

const StyledApplicationBox = styled.a`
    width: 100%;
    border-radius: 20px;
    background: linear-gradient(
        54.12deg,
        rgba(234, 127, 109, 0.93) 40.19%,
        rgba(255, 228, 96, 0.92) 100%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: inline-block;
    padding: 2vh 6vw;
    transition: all 200ms;

    @media ${device.tablet} {
        padding: 2vh 4vw;
    }

    @media ${device.desktop} {
        padding: 2vh 2vw;
    }
    :hover {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    }
`;

const StyledApplicationHeadline = styled.h1`
    margin: 0;
    color: ${colors.secondaryColor};
    margin-bottom: 10px;
    font-size: 2.4rem;
`;

const StyledContentSpacing = styled.div`
    width: 20%;
    height: 0.7vh;
    display: block;
    background-color: ${colors.secondaryColor};
`;

const StyledApplicationContent = styled.p`
    color: ${colors.secondaryColor};
    width: 100%;
    font-size: 1.3rem;
    margin: 0.9vh 0;
    font-weight: bold;
`;

export const ApplicationBox: React.FC<Props> = ({
    applicationHeadline,
    applicationText,
    companyName,
    startDate,
    applicationType,
    endDate,
    applicationId,
}) => {
    return (
        <StyledApplicationBox href={'/details/' + applicationId}>
            <StyledApplicationHeadline>
                {applicationHeadline}
            </StyledApplicationHeadline>
            <StyledContentSpacing></StyledContentSpacing>
            <StyledApplicationContent>{companyName}</StyledApplicationContent>
            <StyledApplicationContent>
                {startDate} - {endDate}
            </StyledApplicationContent>
            <StyledApplicationContent>
                {applicationType}
            </StyledApplicationContent>
            <br />
            <StyledApplicationContent>
                {applicationText}
            </StyledApplicationContent>
        </StyledApplicationBox>
    );
};
