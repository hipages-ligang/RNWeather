import moment from 'moment';

export const getTimeStr = (timeStamp) => {
    return moment.unix(timeStamp).format('ddd D/M');
};

export const getSunsetSunriseTime = (timeStamp) => {
    return moment.unix(timeStamp).format('HH:mm');
};

export const getHourlyTempArr = (hourlyArr) => {
    if (hourlyArr?.length < 1) {
        return [];
    }
    return hourlyArr.map((item) => {
        return parseInt(item.temp);
    });
};

export const getHourlyTimeHourArr = (hourlyArr) => {
    if (hourlyArr?.length < 1) {
        return [];
    }
    return hourlyArr.map((item) => {
        return moment.unix(item.dt).format('HH');
    });
};

export const getHourlyWeatherArr = (hourlyArr) => {
    if (hourlyArr?.length < 1) {
        return [];
    }
    return hourlyArr.map((item) => {
        return item.weather;
    });
};
