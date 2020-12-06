import React, { Fragment} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/fd-basket-item.css';

function FdBasketItem(props) {


    const removeThisItem = () => {
        const {dataObject, removeItem} = props;
        removeItem(dataObject.isbn13);
    };

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
                <Button variant="secondary" onClick={removeThisItem}>Remove</Button>
            </Card.Footer>
        </Card>
    );
}

export default FdBasketItem;
