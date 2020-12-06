import React, {useState} from 'react';
import {withRouter, Redirect} from 'react-router';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function CheckOutPage(props) {
    const {data} = props.location.state;
    const [clear, setClear] = useState(false);



    if (clear) {
        return <Redirect to={{
            pathname: '/store',
        }}/>;
    }

    let sum = data.reduce((sum, next) => sum + parseFloat(next.price), 0);

    return (
        <Container>
            <br/>
            <Form onSubmit={()=> setClear(true)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last name"/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St"/>
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor"/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control/>
                    </Form.Group>
                </Form.Row>
                <div>
                    Total sum is: {sum}$
                </div>
                <br/>
                <br/>
                {/*<PayPalButton*/}
                {/*    amount="0.01"*/}
                {/*    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"*/}
                {/*    onSuccess={(details, data) => {*/}
                {/*        alert('Transaction completed by ' + details.payer.name.given_name);*/}

                {/*        // OPTIONAL: Call your server to save the transaction*/}
                {/*        return fetch('/paypal-transaction-complete', {*/}
                {/*            method: 'post',*/}
                {/*            body: JSON.stringify({*/}
                {/*                orderID: data.orderID,*/}
                {/*            }),*/}
                {/*        });*/}
                {/*    }}*/}
                {/*/>*/}
                <Button variant="danger" onClick={()=> setClear(true)} block>Warning!!! Clicking here will simulate the
                    purchase</Button>
            </Form>
        </Container>
    );
}

export default withRouter(CheckOutPage);
