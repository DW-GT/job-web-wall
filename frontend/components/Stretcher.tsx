import React from 'react';
import { Heading } from 'rebass';
import styled from 'styled-components';

const StretcherLayout = styled.div`
    min-height:65vh;
    margin-top: 10vh;
    overflow-x:hidden;
`;

export const Stretcher  =({
    children,
}) => {
    return (
        <StretcherLayout>
        {children}
        </StretcherLayout>
    );
};