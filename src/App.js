import React from 'react';
import './styles/App.css';
import TweetTextBox from './components/TweetTextBox';
import TweetTextBoxHeader from './components/TweetTextBoxHeader';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <Container className='py-4 my-4'>
            <TweetTextBoxHeader />
            <TweetTextBox />
        </Container>
    );
}

export default App;
