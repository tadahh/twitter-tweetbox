import React from 'react';
import ReactDOM from 'react-dom';
import TweetTextBoxHeader from '../components/TweetTextBoxHeader';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<TweetTextBoxHeader />, div);
    ReactDOM.unmountComponentAtNode(div);
});
