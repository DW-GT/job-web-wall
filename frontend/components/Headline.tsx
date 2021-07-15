import React from 'react';
import { Heading } from 'rebass';
import styled from 'styled-components';

type Props = {
    className?: string;
};

export const Headline: React.FC<Props>  =({
    children,
    className
}) => {
    return (
        <div className={className}>
            <Heading
                text-transform="capitalize"
            >
                {children}
            </Heading>
        </div>
    );
};