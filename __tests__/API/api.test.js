import { fetch7daysForecast, fetchTest } from '../../src/API/api';
import 'isomorphic-fetch';

test('fetch7daysForecast use callback', (done) => {
    function callback(data) {
        try {
            expect(data.value?.daily?.length).toBeGreaterThan(0);
            expect(data.success).toBe(true);
            done();
        } catch (error) {
            done(error);
        }
    }
    fetch7daysForecast(callback);
});

test('fetch7daysForecast use promise', (done) => {
    fetchTest().then((data) => {
        expect(data.value?.daily?.length).toBeGreaterThan(0);
        expect(data.success).toBe(true);
    });
});
