import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import Colors from '../Assets/Colors';
import { getTimeStr } from '../Utils/commonUtils';

const styles = StyleSheet.create({
    itemContainer: {
        height: 60,
        backgroundColor: Colors.cardBg,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.border
    },
    itemWeatherIcon: {
        width: 50,
        height: 50,
        backgroundColor: Colors.primary_light,
        marginRight: 10,
        borderRadius: 3
    }
});

export default HomeScreenItem = ({ item, onPressCallback }) => {
    let weather = item?.weather[0];
    let maxTemp = item?.temp?.max;
    let minTemp = item?.temp?.min;
    let timeStr = getTimeStr(item?.dt);

    return (
        <TouchableOpacity
            onPress={() => {
                if (onPressCallback) {
                    onPressCallback();
                }
            }}
        >
            <View style={styles.itemContainer} key={timeStr}>
                <Image
                    style={styles.itemWeatherIcon}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
                    }}
                />
                <View>
                    <Text>{weather.main}</Text>
                    <Text>{`${parseInt(maxTemp)} / ${parseInt(
                        minTemp
                    )} ℃`}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text>{timeStr}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
