import { Heading } from 'rebass';

type Page = {
    page?: string;
};



export const CurrentPageName :React.FC<Page> = ({page}) =>{
    return(
        <Heading
            text-transform="capitalize"
        >
            {page}
        </Heading>
            
    );
};