import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TweetTextBoxHeader() {
    return (
        <Row>
            <Col className='d-flex justify-content-center'>
                <p className='lead'>
                    Made with{' '}
                    <span role='img' aria-label='Heart'>
                        ❤️
                    </span>{' '}
                    by Tadas
                </p>
            </Col>
        </Row>
    );
}
