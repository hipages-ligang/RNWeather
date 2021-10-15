import React from 'react';
import renderer from 'react-test-renderer';

describe('<HomeScreen />', () => {
    it('home screen snapshot', () => {
        const homeScreenTree = renderer.create(<homeScreen />).toJSON();
        expect(homeScreenTree).toMatchSnapshot();
    });
});
