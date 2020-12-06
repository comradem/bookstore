import React, {Fragment, useEffect, useState} from 'react';
import {
    Switch,
    Route,
    withRouter,
} from 'react-router';

import MainPage from '../src/pages/MainPage';
import LoginPage from '../src/pages/LoginPage';
import AboutPage from '../src/pages/AboutPage';
import FDNavigation from '../src/components/FDNavigation';
import StorePage from '../src/pages/StorePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import FDBasketPage from '../src/pages/FDBasketPage';
import ManagerPage from '../src/pages/ManagerPage';
import EmptyPage from '../src/pages/EmptyPage';
import CheckOutPage from '../src/pages/CheckOutPage';
import {useHttp} from './hooks/http.hook';
import {useAuth} from './hooks/auth.hook';
import {PayloadContext} from './context/PayloadContext';

function App() {
    const [storeData, setStoreData] = useState([]);
    const [basket, setBasket] = useState([]);

    const {token, login, logout, userId, isLoggedIn, userType} = useAuth();

    const {request} = useHttp();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await request('api/store/getAllBooks', 'POST', null);
                setStoreData(data.books);
                // payload.storeData = data.books;
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);

    const addItem = (event, productObject) => {
        setBasket(basket.concat(productObject));
    };

    const updateBasket = (newData) => {
        setBasket(newData);
    };

    const updateItem = (e, item) => {
        switch (e.target.name) {
            case 'delete':
                console.log('removing item from the store' + item);
                storeData.splice(storeData.indexOf(item), 1);
                break;
            case 'edit':
                console.log('editing item' + item);
                break;
            default:
                break;
        }
        setStoreData(storeData);
    };

    const count = basket.length;
    return (
        <Fragment>
            <PayloadContext.Provider value={{token, login, logout, userId, isLoggedIn, userType}}>
                <FDNavigation numOfSelectedItems={count} basket={basket} isAuth={isLoggedIn}
                              handleLogout={logout}/>
                <Switch>
                    <Route exact path={`/`}
                           render={(props) => <MainPage {...props} searchData={storeData}/>}/>
                    <Route exact path={`/store`} render={(props) => <StorePage {...props} storeData={storeData}
                                                                               addItemToBasket={addItem}
                                                                               basket={basket}/>}/>
                    <Route exact path={`/store/search?:searchText`}
                           render={(props) => <StorePage {...props} storeData={storeData}
                                                         addItemToBasket={addItem}
                                                         basket={basket}/>}/>
                    <Route exact path="/login"
                           render={(props) => <LoginPage {...props} isAuth={isLoggedIn}/>}
                           storeData={storeData}/>
                    <Route exact path='/basket' render={(props) => <FDBasketPage {...props}
                                                                                 basket={basket}
                                                                                 updateBasket={updateBasket}
                    />}/>
                    <Route exact path='/manager'
                           render={(props) => <ManagerPage {...props} storeData={storeData}
                                                           isAuth={isLoggedIn}
                                                           updateData={updateItem}/>}/>
                    <Route exact path='/about' render={props => <AboutPage {...props} token={token}/>}/>
                    <Route exact path='/empty' render={props => <EmptyPage {...props}/>}/>
                    <Route exact path='/checkout' render={props => <CheckOutPage {...props}/>}/>
                </Switch>
            </PayloadContext.Provider>
        </Fragment>
    );
}

export default withRouter(App);
