import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreenItem from '../../src/Screens/HomeScreenItem';

describe('<HomeScreenItem />', () => {
    const props = {
        item: {
            dt: 1633665600,
            sunrise: 1633646640,
            sunset: 1633688411,
            moonrise: 1633652820,
            moonset: 1633693200,
            moon_phase: 0.06,
            temp: {
                day: 16.81,
                min: 13.88,
                max: 17.35,
                night: 15.53,
                eve: 16.09,
                morn: 14.02
            },
            feels_like: { day: 16.5, night: 15.28, eve: 15.87, morn: 13.78 },
            pressure: 1016,
            humidity: 75,
            dew_point: 11.77,
            wind_speed: 2.64,
            wind_deg: 41,
            wind_gust: 4.99,
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04d'
                }
            ],
            clouds: 96,
            pop: 0.42,
            uvi: 0.94
        }
    };
    it('home screen item snapshot', () => {
        const homeScreenTree = renderer
            .create(<HomeScreenItem {...props} />)
            .toJSON();
        expect(homeScreenTree).toMatchSnapshot();
    });
});
