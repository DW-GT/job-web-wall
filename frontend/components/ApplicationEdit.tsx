import React, { useState } from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import { device } from '../devices';
import Router from 'next/router';
import cookie from 'js-cookie';

const { colors, fonts } = theme;

const JobDetailsLayout = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 7vh 5vw;
    font-family: ${fonts.primaryFont};
    color: ${colors.primaryBackgroundColor};
    font-weight: bold;
    align-items: center;
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

const StyledInputField = styled.input`
    border: solid 1px black;
    border-radius: 200px;
    margin: 2vh 0;
    padding: 1vh 1vw;
`;

const StyledTextField = styled.textarea`
    border: solid 1px black;
    border-radius: 20px;
    margin: 2vh 0;
    padding: 1vh 1vw;
    width: 50vw;
    max-width: 500px;
    min-height: 100px;
`;

function formatDate(date) {
    date = new Date(date);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}

const StyledSelectField = styled.select`
    border: solid 1px black;
    border-radius: 200px;
    margin: 2vh 0;
    padding: 1vh 1vw;
`;

const StyledLoginButton = styled.input`
    transition: all 200ms;
    align-self: center;
    border-radius: 200px;
    background: transparent;
    cursor: pointer;
    :hover {
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    }
    padding: 1vh 3vw;
`;

function getDateFormatted(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 + '';
    let dt = date.getDate() + '';

    if (Number.parseInt(dt) < 10) {
        dt = '0' + dt;
    }
    if (Number.parseInt(month) < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + dt;
}

export const ApplicationEdit = ({ applicationId }) => {
    const [loginError, setLoginError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [company, setCompany] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const[file,setFile] = useState<FileList | null>();


    const applicationTypes = useSWR(
        `http://localhost:4000/api/application/getOfferTypes/`,
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    const token = cookie.get('token');
    const admin_id = cookie.get('adminId');
    const content = useSWR(
        `http://localhost:4000/api/application/getOffer/` + applicationId,
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    let applicationType = applicationTypes?.find(
        (applicationType) =>
            applicationType.applicationtype_id == content?.applicationtype_id,
    );


    if (content && applicationTypes && name == '') {
        setName(content?.name);
        setCompany(content?.company_name);
        setEndDate(getDateFormatted(content?.expire_date));
        setDescription(content?.description);
        setEmail(content?.email);
        setTelefon(content?.telefon);
        setType(applicationType?.applicationtype_id);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //call api
        if(file == undefined){
            console.log("The file hasn't changed'")
            fetch(process.env.API_ADRESS+'/api/application/editOffer', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    admin_id,
                    token,
                    application: {
                        application_id: content.application_id,
                        name,
                        description,
                        company_name: company,
                        email,
                        telefon,
                        pdf_src: content.application_id,
                        creation_date: content.creation_date,
                        expire_date: content.expire_date,
                        lastupdate_date: new Date().toISOString(),
                        applicationType: type,
                    },
                }),
            })
            .then((r) => {
                return r.status;
            })
            .then((status) => {
                if (status == 200) {
                    Router.push('/adminOverview');
                } else {
                    setLoginError('Der Eintrag konnte nicht gespeichert werden');
                }
            });
        }else{
            console.log("changing the file");
                fetch(process.env.API_ADRESS+'/api/application/editOffer', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        admin_id,
                        token,
                        application: {
                            application_id: content.application_id,
                            name,
                            description,
                            company_name: company,
                            email,
                            telefon,
                            pdf_src: content.application_id,
                            creation_date: content.creation_date,
                            expire_date: content.expire_date,
                            lastupdate_date: new Date().toISOString(),
                            applicationType: type,
                        },
                    }),
                }).then((r) => {
                    return r.status;
                })
                .then((status) => {
                    console.log("stats work for putting the file");
                    console.log(status);
                    if (status == 200) {
                        console.log("should work for putting the file");
                    let data = new FormData();
    
                    let fileToUpload= file[0];
            
                    data.append("file", fileToUpload);
                    data.append("id",content.application_id);
                    
                    fetch(process.env.API_ADRESS+'/api/application/upload',{
                    method: 'POST',
                    body: data
                    }).then((r) => {
                        return r.status;
                    }).then((status) => {
                        if (status == 200){
                            Router.push('/adminOverview');
                        } else {
                            setLoginError('Der Eintrag konnte nicht gespeichert werden');
                        }
    
                    });
                    }
                });
        }
        }
        
        
    

    return (
        <JobDetailsLayout>
            <div>
                <StyledJobHeadline>Bearbeiten</StyledJobHeadline>
                <StyledSpaceBar></StyledSpaceBar>
                <form onSubmit={handleSubmit}>
                    <br />
                    <label>Name:</label>
                    <br />
                    <StyledInputField
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></StyledInputField>
                    <br />
                    <label>Firma:</label>
                    <br />
                    <StyledInputField
                        placeholder="Firma"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    ></StyledInputField>
                    <br />
                    <label>E-Mail:</label>
                    <br />
                    <StyledInputField
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></StyledInputField>
                    <br />
                    <label>Telefon:</label>
                    <br />
                    <StyledInputField
                        placeholder="Telefon"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                    ></StyledInputField>
                    <br />
                    <label>PDF Link:</label>
                    <br />
                    <StyledInputField
                        name="file"
                        type="file"
                        placeholder="PDF"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files)}
                    ></StyledInputField>
                    <br />
                    <label>End-Datum:</label>
                    <br />
                    <StyledInputField
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    ></StyledInputField>
                    <br />
                    <label>Beschreibung:</label>
                    <br />
                    <StyledTextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></StyledTextField>
                    <br />
                    <label>Typ:</label>
                    <br />
                    <StyledSelectField
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {applicationTypes?.map((currentType) => {
                            return (
                                <option value={currentType.applicationtype_id}>
                                    {currentType.name}
                                </option>
                            );
                        })}
                    </StyledSelectField>
                    <br />
                    <StyledLoginButton
                        type="submit"
                        value="Speichern"
                    ></StyledLoginButton>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </form>
            </div>
        </JobDetailsLayout>
    );
};
