import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

  return (    
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
            type="search"
            className="me-2"
            aria-label="Search"
            name='q' 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder='Search Products...'
        />
        <Button type='submit' variant="outline-success">Search</Button>
    </Form>
  )
}

export default SearchBox;