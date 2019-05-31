import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import useDebounce from '../hooks/useDebounce';
import useTwitterUserSearchApi from '../hooks/useTwitterUserSearchApi';
import '../styles/TweetTextBox.css';

export default function TweetTextBox() {
    const [tweet, setTweet] = useState('');
    const [userMention, setUserMention] = useState('');
    const [tweetLengthOpen, setTweetLengthOpen] = useState(false);

    const { twitterUsers, doFetch, resetTwitterUsers } = useTwitterUserSearchApi();

    const debouncedUserMention = useDebounce(userMention, 500);
    const textAreaMaxLength = 140;

    useEffect(() => {
        const tweetTextArea = document.getElementById('tweetTextArea');

        if (tweetTextArea) {
            const cursorIndex = tweetTextArea.selectionStart;
            const tweetSubString = tweet.substring(tweet[0], cursorIndex);
            const symbolIndex = tweetSubString.lastIndexOf('@');

            if (symbolIndex !== -1 && (tweetSubString[symbolIndex - 1] === ' ' || symbolIndex === 0)) {
                let enteredUserMention = tweetSubString.substring(symbolIndex, cursorIndex);

                if (enteredUserMention.indexOf(' ') === -1) {
                    setUserMention(enteredUserMention);
                }
            }

            setTweetLengthOpen(true);
        }
    }, [tweet]);

    useEffect(() => {
        if (debouncedUserMention.length >= 3) {
            const debouncedUser = debouncedUserMention.slice(1); //remove @ from front

            doFetch(debouncedUser);
        }
    }, [debouncedUserMention]);

    useEffect(() => {
        setTimeout(() => {
            setTweetLengthOpen(false);
        }, 3000);
    }, [tweetLengthOpen]);

    const handleChange = event => {
        setTweet(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === ' ') {
            resetTwitterUsers();
            setUserMention('');
        }
    };

    const autoComplete = event => {
        let userScreenName = event.target.closest('button').querySelector('#userScreenName').innerText;

        setTweet(tweet.replace(userMention, userScreenName));
        setUserMention('');
        resetTwitterUsers();
    };

    return (
        <>
            <Row className='justify-content-md-center'>
                <Col>
                    <Form>
                        <Form.Control
                            id='tweetTextArea'
                            size='lg'
                            type='text'
                            as='textarea'
                            rows='3'
                            placeholder={`What's happening?`}
                            value={tweet}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {twitterUsers.map(user => {
                            return (
                                <ListGroup.Item action key={user.screen_name} onClick={autoComplete}>
                                    <ul className='list-inline mb-0 text-truncate'>
                                        <li className='list-inline-item'>
                                            <Image src={user.profile_image_url} rounded />
                                        </li>
                                        <li className='list-inline-item font-weight-bold'>{user.name}</li>
                                        <li id='userScreenName' className='list-inline-item text-muted '>
                                            {`@${user.screen_name}`}
                                        </li>
                                    </ul>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center pt-2'>
                    <Button
                        variant='outline-primary'
                        className={textAreaMaxLength - tweet.length > 0 ? '' : 'disabled'}>
                        Tweet
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center pt-2'>
                    <Fade in={tweetLengthOpen}>
                        <small className={textAreaMaxLength - tweet.length < 0 ? 'text-red' : 'text-muted'}>
                            {textAreaMaxLength - tweet.length}
                        </small>
                    </Fade>
                </Col>
            </Row>
        </>
    );
}
