import React, {useState} from 'react';
import '../styles/about.css';
import {useHttp} from '../hooks/http.hook';
import {Redirect} from 'react-router';
import FDMyBook from '../components/FDMyBook';
import {Button} from 'react-bootstrap';


function AboutPage(props) {

    const {request} = useHttp();
    const [data, setData] = useState([]);

    const tmp = localStorage.getItem('userData');
    const userData = JSON.parse(tmp);
    let uToken = '';
    if (userData) {
        uToken = userData.userToken;
    }

    const getData = async () => {
        try {
            console.log('****** CALLED getPurchasedBooks with token: ' + uToken);
            let response = await request('api/user/getPurchasedBooks', 'POST', {},{
                Authorization: `Bearer ${uToken}`,
            });
            // response = await response.json();
            // console.log("my last purchases are : "+ response);
            setData(response);
        } catch (e) {
            // handled in BE
        }
    };

    if (!uToken) {
        return <Redirect to={{
            pathname: '/login',
        }}
        />;
    }

    let items = [];
    if (data.books){
        items = data.books.map((item, index) => <FDMyBook key={index} dataObject={item}/>);
    }
    return (
        <div className='p-about-container'>
            <div>
                Book Store
                <br/>
                <Button onClick={getData}>Show me my last purchases</Button>
                <br/>
                {items}
            </div>
        </div>
    );
}

export default AboutPage;
