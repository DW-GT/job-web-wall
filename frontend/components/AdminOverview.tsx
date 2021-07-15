import React, { useState } from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import Router from 'next/router';
import cookie from 'js-cookie';
import useSWR from 'swr';
import axios from 'axios';

const { colors, fonts } = theme;

const AdminOverviewLayout = styled.table`
    width: 100vw;
    padding: 7vh 10vw;
    border-spacing: 20px;
`;

const StyledAdminTableHeader = styled.th`
    text-align: left;
`;

const StyledAdminTableContent = styled.td``;

const StyledEditLink = styled.a`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const StyledDeleteButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 1rem;
    :hover {
        text-decoration: underline;
    }
`;

const DeleteApplicationLayout = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #00000086;
`;

const DeleteApplicationBox = styled.div`
    padding: 10vh 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.secondaryColor};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    flex-direction: column;
`;

const StyledButton = styled.button`
    transition: all 200ms;
    align-self: center;
    border-radius: 200px;
    background: transparent;
    cursor: pointer;
    :hover {
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    }
    padding: 1vh 3vw;
    margin: 1vh 1vw;
`;

const StyledLink = styled.a`

`;

const StyledAddButton = styled.a`
    transition: all 200ms;
    line-height: 2.5rem;
    :hover {
        font-size: 1.5rem;
    }
`;

export const AdminOverview = () => {
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [offerId, setOfferId] = useState(-1);

    const token = cookie.get('token');
    const admin_id = cookie.get('adminId');
    if (!token) {
        // Router.push('/login');
    }

    const applications = useSWR(
        process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getAllOffers/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    function deleteOffer(id: number) {
        //call api
        fetch(process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/deleteOffer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                admin_id: admin_id,
                token: token,
                applicationid: id,
            }),
        })
            .then((r) => {
                return r.status;
            })
            .then((status) => {
                console.log(status);
                if (status == 200) {
                    //set cookie
                    Router.reload();
                }
            });
    }

    return (
        <AdminOverviewLayout>
            <StyledAddButton href="/addApplication">+</StyledAddButton>
            {showLoginBox ? (
                <DeleteApplicationLayout>
                    <DeleteApplicationBox>
                        <h3>Möchten Sie diesen Eintrag wirklich löschen?</h3>
                        <div>
                            <StyledButton
                                onClick={() => {
                                    setOfferId(-1);
                                    setShowLoginBox(false);
                                }}
                            >
                                Abbrechen
                            </StyledButton>
                            <StyledButton
                                onClick={() => {
                                    deleteOffer(offerId);
                                }}
                            >
                                Löschen
                            </StyledButton>
                        </div>
                    </DeleteApplicationBox>
                </DeleteApplicationLayout>
            ) : (
                ''
            )}
            <tr>
                <StyledAdminTableHeader>ID</StyledAdminTableHeader>
                <StyledAdminTableHeader>Name</StyledAdminTableHeader>
                <StyledAdminTableHeader>Firma</StyledAdminTableHeader>
                <StyledAdminTableHeader>Bearbeiten</StyledAdminTableHeader>
                <StyledAdminTableHeader>Löschen</StyledAdminTableHeader>
            </tr>
            {applications?.map((application) => {
                return (
                    <tr>
                        <StyledAdminTableContent>
                            {application.application_id}
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            <StyledLink href={"/details/" + application.application_id} target="_blank">{application.name}</StyledLink>
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            {application.company_name}
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            <StyledEditLink
                                href={'/edit/' + application.application_id}
                            >
                                Bearbeiten
                            </StyledEditLink>
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            <StyledDeleteButton
                                onClick={(e) => {
                                    setOfferId(application.application_id);
                                    setShowLoginBox(true);
                                }}
                            >
                                Löschen
                            </StyledDeleteButton>
                        </StyledAdminTableContent>
                    </tr>
                );
            })}
        </AdminOverviewLayout>
    );
};
