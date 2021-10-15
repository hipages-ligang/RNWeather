import { getTimeStr } from '../../src/Utils/commonUtils';

describe('commonUtils test', () => {
    test('getTimeStr', () => {
        let value = getTimeStr(1634277859);
        expect(value).toBe('Fri 15/10');
    });
});
