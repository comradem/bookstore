import React, { Fragment} from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/fd-basket-item.css';

function FDMyBook(props) {

    const {dataObject} = props;
    if (!dataObject) {
        return (<Fragment/>);
    }
    return (
        <Card>
            <Card.Header>{dataObject.title}</Card.Header>
            <Card.Body>
                <Card.Img className='item-image' variant='top' src={dataObject.image}/>
                <Card.Title>{dataObject.subtitle}</Card.Title>
                <Card.Text>
                    Price: {dataObject.price}$
                </Card.Text>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    );
}

export default FDMyBook;
