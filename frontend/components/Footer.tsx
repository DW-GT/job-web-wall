import React, { useState } from 'react';
import { Box } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';
import Image from 'next/image';
import { device } from '../devices';
import cookie from 'js-cookie';
import Router from 'next/router';

const { colors, fonts } = theme;

const FooterBoxLayout = styled.div`
    width: 100%;
    padding: 5vh 5vw;
    display: flex;
    flex-direction: column;
    background-color: ${colors.primaryBackgroundColor};
    color: ${colors.secondaryColor};
    font-family: ${fonts.primaryFont};
    margin-top: 5vh;

    @media ${device.desktop} {
        flex-direction: row;
        justify-content: space-around;
    }
    overflow: hidden;
`;

const FooterLinkBoxLayout = styled.div`
    margin-bottom: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${device.desktop} {
        flex-direction: row;
        width: 50%;
        justify-content: space-evenly;
        align-items: center;
        margin: 0;
    }
`;

const StyledFooterLink = styled.a`
    margin: 1vh 0;
    transition: all 200ms;
    :hover{
        text-decoration: underline;
    }
`;

const FooterLogoLayout = styled.div`
    padding: 0 5vw;
    display: flex;
    justify-content: center;
`;

const StyledLogoutButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${colors.secondaryColor};
    font-size: 1rem;
    margin: 1vh 0;
    cursor: pointer;
    transition: all 200ms;
    :hover{
        text-decoration: underline;
    }
`;

export const Footer = ({}) => {
    const token = cookie.get('token');
    const adminId = cookie.get('adminId');
    const [loggedIn, setLoggedIn] = useState(false);
    if (token && !loggedIn) {
        setLoggedIn(true);
    }
    return (
        <FooterBoxLayout>
            <FooterLinkBoxLayout>
                <StyledFooterLink
                    target="_blank"
                    href="https://www.htl-leonding.at/kontakt/"
                >
                    Kontakt
                </StyledFooterLink>
                <StyledFooterLink
                    target="_blank"
                    href="https://www.htl-leonding.at/impressum/"
                >
                    Impressum
                </StyledFooterLink>
                <StyledFooterLink
                    target="_blank"
                    href="https://www.htl-leonding.at/datenschutz/"
                >
                    Datenschutz
                </StyledFooterLink>
                {loggedIn ? (
                    <StyledFooterLink href="/adminOverview">
                        Admin Dashboard
                    </StyledFooterLink>
                ) : (
                    ''
                )}
                {loggedIn ? (
                    <StyledLogoutButton
                        onClick={() => {
                            cookie.remove('token');
                            cookie.remove('adminId');
                            setLoggedIn(false);
                            //call api
                            fetch(
                                process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/logOut',
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        admin_id: adminId,
                                        token,
                                    }),
                                },
                            )
                                .then((r) => {
                                    return r.status;
                                })
                                .then((status) => {
                                    if (status == 200) {
                                        Router.push('/');
                                    }
                                });
                        }}
                    >
                        Logout
                    </StyledLogoutButton>
                ) : (
                    ''
                )}
            </FooterLinkBoxLayout>
            <FooterLogoLayout>
                <a href="https://www.htl-leonding.at" target="_blank">
                    <Image
                        alt="Htl Logo"
                        width={400}
                        height={100}
                        src="/htl-leonding-logo.svg"
                    ></Image>
                </a>
            </FooterLogoLayout>
        </FooterBoxLayout>
    );
};
