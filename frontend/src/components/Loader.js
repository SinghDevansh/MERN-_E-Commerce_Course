import React from 'react'
import { Spinner } from 'react-bootstrap'


const Loader = () => {
    return (
        <Spinner animation='grow' role='status' variant='warning' style={{
            width: '100px',
            height: '100px',
            display: 'block',
            margin:'auto'
        }}>
           <span className='sr-only'>Loading...</span> 
        </Spinner>
    )
}

export default Loader
