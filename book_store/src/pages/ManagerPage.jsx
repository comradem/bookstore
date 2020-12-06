import React, {Fragment} from 'react';
import {withRouter} from 'react-router';
import Container from 'react-bootstrap/Container';
import {Redirect} from 'react-router';
import FDCard from '../components/FDCard';
import '../styles/manager.css';
import {useAuth} from '../hooks/auth.hook';

function ManagerPage(props) {

    const auth = useAuth();

    const isManager = auth.userType === 'Admin';

    const {storeData, isAuth, updateData} = props;
    if (!isAuth) {
        return <Redirect to="/"/>;
    }
    let data = storeData.map((item, index) => <FDCard key={index} dataObject={item}
                                                      isManager={isManager} updateData={updateData}/>);
    return (
        <Fragment>
            <Container className='p-manager'>
                {data}
            </Container>
        </Fragment>
    );
}

export default withRouter(ManagerPage);
