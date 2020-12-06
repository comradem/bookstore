import React, {useState, Fragment, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import FdBasketItem from '../components/FDBasketItem';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router';
import {useHttp} from '../hooks/http.hook';
import {PayloadContext} from '../context/PayloadContext';


function FDBasketPage(props) {

    const [data, setData] = useState(props.basket ? props.basket : []);
    const auth = useContext(PayloadContext);
    console.log();
    const {request} = useHttp();
    const removeItem = (itemId) => {
        let newBasket = data.filter(item => item.isbn13 !== itemId); // filter double clicks
        setData(newBasket);
        const {updateBasket} = props;
        updateBasket(newBasket);
    };

    async function updateDB() {
        try {
            let arr = [];
            data.forEach(item => arr.push(item.isbn13));

            const tmp = localStorage.getItem('userData');
            const userData = JSON.parse(tmp);
            let uToken = '';
            if (userData) {
                // console.log('userData.userToken: ' + userData.userToken);
                uToken = userData.userToken;
                // console.log('Setting uToken to: '+uToken);
            }
            // console.log('****** CALLED updatePurchasedBooks ******' + uToken);
            const resp = await request('api/user/updatePurchasedBooks', 'POST', arr, {
                Authorization: `Bearer ${uToken}`,
            }).then(() => {
                console.log('****** CALLED updatePurchasedBooks ******' + JSON.stringify(resp));
            });
            // console.log('received books for user: ' + resp);
            return resp;
        } catch (e) {
            //handled in backend
        }
    }

    const moveToCheckout = () => {
        if (!auth.isLoggedIn) {
            props.history.push({pathname: '/login'});
        } else {
            updateDB();
            setData([]);
            props.history.push({pathname: '/store'});
        }
    };


    let items = data.map((item, index) => <FdBasketItem key={index} dataObject={item}
                                                        removeItem={removeItem}/>);


    if (data.length <= 0) {
        return (<Fragment>your basket is empty</Fragment>);
    }
    return (
        <Container fluid>
            <div>
                {items}
            </div>
            <div>{
                items.length > 0 ? <Fragment>
                    <br/>
                    <Button variant='success' block type='button' onClick={moveToCheckout}>Checkout</Button>
                </Fragment> : null
            }
            </div>
        </Container>

    );
}

export default withRouter(FDBasketPage);
