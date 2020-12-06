import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/main.css';


function MainPage(props) {

    const [searchText, setSearchText] = useState('');

    const handleSearchInput = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {

        props.history.push({
            pathname: `/store/search?${searchText}`,
        });
    };


    return (
        <div className='p-main-search-bar'>
            <div className='main-page-logo'>BOOK STORE</div>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="formSearch">
                    <Form.Control type="text" placeholder="Search for ui, php, node, etc...." onChange={handleSearchInput}/>
                </Form.Group>
                <div className='search-bar-buttons'>
                    <Button variant="secondary" type="button" className='p-main-search-btn'
                            onClick={handleSearch}
                    >
                        Search
                    </Button>
                    <Button variant="secondary" type="button" className='p-main-search-btn'
                            onClick={() => props.history.push({
                                pathname: `/store`,
                            })}>
                        Find for me
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default MainPage;
