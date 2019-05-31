import React from 'react';
import ReactDOM from 'react-dom';
import TweetTextBox from '../components/TweetTextBox';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<TweetTextBox />, div);
    ReactDOM.unmountComponentAtNode(div);
});
