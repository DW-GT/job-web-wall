import React from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import store from '../redux/store';
import Image from 'next/image';

const { colors, fonts } = theme;

type Props = {
    showNavigationSelectBox?: boolean;
};

const StyledHtlLogo = styled.a`
    position: absolute;
    top: 1.8vh;
    left: 1.8vh;
    height: 3.9vh;
    width: 3.9vh;
`;

const StyledNavigation = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${colors.secondaryBackgroundColor};
    padding: 1.8vh 0;
    justify-content: center;
    min-height: 7.5vh;
`;

const StyledSelectBox = styled.select`
    background-color: ${colors.primaryBackgroundColor};
    color: ${colors.secondaryColor};
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    text-align-last: center;
    border: none;
    font-family: ${fonts.primaryFont};
    padding: 5px;
    padding-right: 40px;
    background: url('/mainIcon.svg') no-repeat right rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    background-position-x: calc(50vw-30px);
    position: relative;
    cursor: pointer;
    transition: all 500ms;

    :focus {
        background-image: url(/mainIconRotated.svg);
        background-position-x: calc(50vw-30px);
    }
`;

const StyledOption = styled.option`
    background-color: ${colors.primaryBackgroundColor};
    text-align: center;
    text-align-last: center;
`;

export const Navigation: React.FC<Props> = ({ showNavigationSelectBox }) => {
    const applicationTypes = useSWR(
        process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getOfferTypes/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    function changeContent(e) {
        store.dispatch({
            type: 'changeId',
            typeId: e.target.value,
        });
    }

    return (
        <StyledNavigation className="nav">
            <StyledHtlLogo href="/">
                <Image
                    alt="Htl Logo"
                    width="100%"
                    height="100%"
                    src="/htl-leonding-logo-small.svg"
                ></Image>
            </StyledHtlLogo>
            {showNavigationSelectBox ? (
                <StyledSelectBox onChange={changeContent} id="typeChanger">
                    <StyledOption value="-1">All</StyledOption>
                    {applicationTypes?.map((type, index) => {
                        return (
                            <StyledOption value={type.applicationtype_id}>
                                {type.name}
                            </StyledOption>
                        );
                    })}
                </StyledSelectBox>
            ) : (
                ''
            )}
        </StyledNavigation>
    );
};
