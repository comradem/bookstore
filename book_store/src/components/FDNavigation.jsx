import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '../styles/navigation.css'
import imgBasket from '../images/shopping-cart24x24.png'
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import {useAuth} from '../hooks/auth.hook';

const FDNavigation = (props)=> {

        const {isAuth, handleLogout, history,numOfSelectedItems} = props;
        const [text, setText] = useState('');

        const auth = useAuth();

        const isManager = auth.userType === "Admin";

        let hide = 'hidden';
        if (numOfSelectedItems !== 0) {
            hide = ''
        }

        return (
            <Navbar className='sticky-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to={
                    {
                        pathname: '/'
                    }
                }>BS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={
                            {
                                pathname: '/store'
                            }
                        }>Store</Nav.Link>
                        {/*<Nav.Link href="/search">Search</Nav.Link>*/}
                        <Nav.Link as={Link} to={
                            {
                                pathname: '/about'
                            }
                        }>About</Nav.Link>
                    </Nav>
                    <Form onSubmit={() => history.push({
                        pathname: `/store/search?${text}`
                    })}>
                        <input type="text" placeholder='search' className='search-bar-input' onChange={(event) => setText(event.target.value)}/>
                    </Form>
                    <Nav>
                        <Nav.Link as={Link} to={
                            {
                                pathname: '/basket'
                            }
                        }>
                            <Badge className={`badge badge-pill badge-danger ${hide}`}
                                   variant="danger">{numOfSelectedItems}</Badge>
                            <span className='img_bg'><img src={imgBasket} alt="basket"/></span>
                        </Nav.Link>
                        <Nav.Link as={Link} to={isManager ? {pathname: '/manager'} : {pathname: '/login'}} onClick={() =>
                            isAuth ? handleLogout() : null
                        }>
                            {isAuth ? 'Logout' : 'Account'}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
};

export default withRouter(FDNavigation);
