import React from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import { ApplicationBox } from '../components/ApplicationBox';
import useSWR from 'swr';
import { useState } from 'react';
import axios from 'axios';
import store from '../redux/store';
import { device } from '../devices';

const { colors, fonts } = theme;

const ApplicationLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5vh;
    width: 100%;
    padding: 5vw;

    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr;
    }

    @media ${device.desktop} {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const SearchInputLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledInputField = styled.input`
    margin: 3vh 0;
    border-radius: 10px;
    padding: 2vh 40vw 2vh 5vw;
    border: none;
    box-shadow: 0px 0px 19px rgb(0 0 0 / 40%);
    font-size: 1rem;
    transition: all 200ms;

    :hover {
        box-shadow: 0px 0px 24px rgb(0 0 0 / 40%);
    }
    :focus {
        box-shadow: 0px 0px 14px rgb(0 0 0 / 30%);
    }

    @media ${device.tablet} {
        padding: 2vh 8vw 2vh 2vw;
    }

    @media ${device.desktop} {
        padding: 2vh 15.5vw 2vh 1.5vw;
    }
`;

function formatDate(date) {
    date = new Date(date);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}

export const Applications = ({}) => {
    const [inputValue, setInputValue] = useState('');
    const applicationTypes = useSWR(
        process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getOfferTypes/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;


    const [val, setVal] = useState();

    const unsubscribe = store.subscribe(() => {
        setVal(store.getState().state.typeId);
    });


    const [postsFiltered, setPosts] = useState([]);

    
    let posts = useSWR(
        store.getState().state != undefined && store.getState().state.typeId != -1
            ? process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getSpecificOffers/' +
                  store.getState().state.typeId
            : process.env.NEXT_PUBLIC_API_ADRESS+'/api/application/getAllOffers/',
        (url: string) => axios(url).then((r) => {
            setPosts(r.data);
            return r.data}),
    ).data;

    function updateApplications(text:String) {
        if(text.length === 0){
            setPosts(posts);
        }
        let temp = posts.filter((application) => {
            return application.name.toLowerCase().includes(text.toLowerCase()) || application.description.toLowerCase().includes(text.toLowerCase()) || application.company_name.toLowerCase().includes(text.toLowerCase());
        });
        
        setPosts(temp); 
    }

    return (
        <div>

            <SearchInputLayout>
                <StyledInputField
                    type="text"
                    placeholder="Suchen..."
                    onChange={e => { updateApplications(e.currentTarget.value); }}
                ></StyledInputField>
            </SearchInputLayout>
        <ApplicationLayout>
            {
            postsFiltered?.map((application, index) => {
                let applicationType = applicationTypes?.find(
                    (applicationType) =>
                        applicationType.applicationtype_id ==
                        application.applicationtype_id,
                );
                let applicationTypeName;
                if (applicationType) {
                    applicationTypeName = applicationType.name;
                } else {
                    applicationTypeName = '';
                }
                return (
                    <ApplicationBox
                        applicationHeadline={application.name}
                        applicationText={application.description}
                        companyName={application.company_name}
                        startDate={formatDate(application.creation_date)}
                        endDate={formatDate(application.expire_date)}
                        applicationType={applicationTypeName}
                        key={index}
                        applicationId={application.application_id}
                    ></ApplicationBox>
                );
            })}
        </ApplicationLayout>
        </div>
    );
};
