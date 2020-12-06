import React, {Fragment, useState} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

import '../styles/fd-card.css'
import {useHttp} from '../hooks/http.hook';

const FDCard = (props) => {

    const {title, price, searchKeywords, image, isbn13} = props.dataObject;
    const {addItemToBasket, isManager, dataObject, updateData} = props;
    const [showModal, setShowModal] = useState(false);
    const [newPrice, setNewPrice] = useState(price);
    const [newProductImage, setNewProductImage] = useState(image);
    const [newProductName, setNewProductName] = useState(title);
    const [newSearchKeywords, setNewSearchKeywords] = useState(searchKeywords);
    const [newIsbn, setNewIsbn] = useState(isbn13);
    const {request} = useHttp();

    const tmp = localStorage.getItem('userData');
    const userData = JSON.parse(tmp);
    let uToken = '';
    let userType = 'User';
    if (userData) {
        uToken = userData.userToken;
        userType = userData.userType;
    }

    const updateCard = async () => {
        //body:
        // {
        //     "_id": "5fcb33e77b9a0507398ba93e",
        //     "title": "No No Node.js new book!!!!",
        //     "subtitle": "new released book another time, new data is updated",
        //     "isbn13": "3781449333607",
        //     "price": "12.00",
        //     "image": "https://itbook.store/img/books/9781449333607.png",
        //     "url": "https://itbook.store/books/9781449333607",
        //     "searchKeywords": "new, no, new book, new words"
        // }
        // let body = dataObject);
        // console.log("dataObject is: "+ JSON.stringify(dataObject,null,2));
        try {
            console.log('****** CALLED updateBook with token: ' + uToken);
            let response = await request('api/admin/updateBook', 'POST', props.dataObject,{
                Authorization: `Bearer ${uToken}`,
            });
            // response = await response.json();
            console.log("updated a book : "+ response);
        } catch (e) {
            // handled in BE
        }
    };

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
        console.log(JSON.stringify(dataObject,null,2));
        updateCard();
    };

    const handlePriceChange = (e) => {
        dataObject.price = e.target.value;
        setNewPrice(e.target.value);
    };

    const handleProductImageChange = (e) => {
        dataObject.image = e.target.value;
        setNewProductImage(e.target.value);
    };

    const handleProductNameChange = (e) => {
        dataObject.title = e.target.value;
        setNewProductName(e.target.value);
    };

    const handleKeywordsChange = (e) => {
        dataObject.searchKeywords = e.target.value;
        setNewSearchKeywords(e.target.value);
    };

    const handleIsbnChange = (e) => {
        dataObject.searchKeywords = e.target.value;
        setNewIsbn(e.target.value);
    }


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
                {userType === 'Admin' ?
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
                                    <Form.Group controlId="formIsbn13">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control placeholder="isbn" value={newIsbn} onChange={(e) => handleIsbnChange(e)}/>
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
