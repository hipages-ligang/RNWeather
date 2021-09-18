import moment from 'moment';

export const getTimeStr = (timeStamp) => {
    return moment.unix(timeStamp).format('ddd D/M/YYYY');
};
