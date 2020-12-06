import React from 'react';
import Container from 'react-bootstrap/Container';
import {Redirect} from 'react-router';
import FDCard from '../components/FDCard';
import '../styles/store.css';

export default function StorePage(props) {

    let {storeData, addItemToBasket} = props;
    let searchStr = props.match.params.searchText;

    // console.log("search text is: "+ searchStr);
    // console.log("search text in data: "+ JSON.stringify(storeData,null,2));
    //filter out unnecessary items


    let processed = searchStr ? storeData.filter(item => item.searchKeywords.includes(searchStr)) : storeData;

    if (processed.length === 0) {
        return <Redirect to={{
            pathname: '/empty',
        }}/>;
    }


    let data = processed.map((item, index) => <FDCard key={index} dataObject={item}
                                                      addItemToBasket={addItemToBasket}/>);
    return (
        <Container className='p-store'>
            {data}
        </Container>
    );

}

