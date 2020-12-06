import React, {Fragment, useState} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

import '../styles/fd-card.css'

const FDCard = (props) => {

    const {title, price, searchKeywords, image} = props.dataObject;
    const {addItemToBasket, isManager, dataObject, updateData} = props;
    const [showModal, setShowModal] = useState(false);
    const [newPrice, setNewPrice] = useState(price);
    const [newProductImage, setNewProductImage] = useState(image);
    const [newProductName, setNewProductName] = useState(title);
    const [newSearchKeywords, setNewSearchKeywords] = useState(searchKeywords);

    const handleEdit = () => {
        open();
    };

    const open = () => {
        setShowModal(true)
    };

    const close = () => {
        setShowModal(false)
    };

    const handleItemUpdate = (e) => {
        console.log('why u no listen');
        console.log(e);
    };

    const handlePriceChange = (e) => {
        dataObject.originalPrice = e.target.value;
        setNewPrice(e.target.value);
    };

    const handleProductImageChange = (e) => {
        dataObject.productImage = e.target.value;
        setNewProductImage(e.target.value);
    };

    const handleProductNameChange = (e) => {
        dataObject.productName = e.target.value;
        setNewProductName(e.target.value);
    };

    const handleKeywordsChange = (e) => {
        dataObject.searchKeywords = dataObject.searchKeywords.concat(e.target.value.split(','));
        setNewSearchKeywords(e.target.value);
    };


    return (
        <Card style={{width: '18rem'}} className='fd-card'>
            <Card.Img variant="top" src={image}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {price}$
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {!isManager ? <Button variant="success" onClick={(ev) => {
                    props.dataObject.selected = true;
                    addItemToBasket(ev, props.dataObject);
                }
                }>Add + </Button> : null}
                {isManager ?
                    <Fragment>
                        <Button className='edit-btn' name='edit' variant='danger'
                                onClick={() => handleEdit()}>Edit</Button>
                        <Modal className="modal-container"
                               show={showModal}
                               onHide={() => close()}
                               animation={true}
                               bssize="small">

                            <Modal.Header closeButton>
                                <Modal.Title>Edit item: {`${dataObject.isbn13}`}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="formProductImage">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control placeholder="image url" value={newProductImage} onChange={(e) => handleProductImageChange(e)}/>
                                    </Form.Group>
                                    <Form.Group controlId="formProductName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control placeholder="product name" value={newProductName} onChange={(e) => handleProductNameChange(e)}/>
                                    </Form.Group>
                                    <Form.Group controlId="formOriginalPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control placeholder="price" value={newPrice} onChange={(e) => handlePriceChange(e)}/>
                                    </Form.Group>
                                    <Form.Group controlId="formSearchKeywords">
                                        <Form.Label>Keywords</Form.Label>
                                        <Form.Control placeholder="comma separated values" value={newSearchKeywords} onChange={(e) => handleKeywordsChange(e)}/>
                                    </Form.Group>
                                    <Button bsStyle="primary" type='button'
                                            onClick={(e) => handleItemUpdate(e)}>Save changes</Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => close()}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <Button className='remove-btn' name='delete' variant='danger'
                                onClick={(e) => updateData(e, dataObject)}>Delete</Button>
                    </Fragment>
                    : null}
            </Card.Footer>
        </Card>
    );
};

export default FDCard;
