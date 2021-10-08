export const fetch7daysForecast = (callback) => {
    const callbackResult = { success: false };
    let baseUrl =
        'https://api.openweathermap.org/data/2.5/onecall?lat=34.210946&lon=108.84202&units=metric&exclude=minutely&appid=8887c7d850fedd807233c36246129527';
    fetch(baseUrl)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            callbackResult.success = true;
            callbackResult.value = response;
            callback(callbackResult);
        })
        .catch((error) => {
            console.log(`fetch error ${error}`);
            callback(callbackResult);
        });
};
