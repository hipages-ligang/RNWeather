import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { getTimeStr, getHourTimeStr } from './Utils/commonUtils';
import Colors from './Assets/Colors';
const styles = StyleSheet.create({
    currentWeatherIcon: {
        width: 50,
        height: 50
    },

    itemWeatherIcon: {
        width: 50,
        height: 50,
        backgroundColor: Colors.primary_light,
        marginRight: 10,
        borderRadius: 3
    }
});

class BroadcastDay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.currentWeather = props.route?.params?.current;
        this.hourly = props.route?.params?.hourly;
        this.dayWeather = props.route?.params?.dayWeather;
        console.log(
            '---' +
                JSON.stringify(this.currentWeather) +
                '----' +
                this.hourly.length
        );
    }

    componentDidMount() {}

    renderItem = (item) => {
        let timeStr = getHourTimeStr(item?.dt);
        let icon = item?.weather[0].icon;
        let temp = parseInt(item?.temp);
        return (
            <View>
                <Text>{timeStr}</Text>
                <Image
                    style={styles.itemWeatherIcon}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${icon}@2x.png`
                    }}
                />
                <Text>{temp}</Text>
            </View>
        );
    };

    render() {
        let curItem = this.currentWeather;
        if (this.dayWeather != null) {
            curItem = this.dayWeather;
        }
        let timeStr = getTimeStr(curItem?.dt);
        let weatherIcon = curItem?.weather[0].icon;
        let weatherTitle = curItem?.weather[0].main;
        let weatherDesc = curItem?.weather[0].description;

        let hourlyData = this.hourly;

        return (
            <View style={{ flex: 1 }}>
                <Text>{timeStr}</Text>
                <Image
                    style={styles.currentWeatherIcon}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
                    }}
                />
                <Text>{weatherTitle}</Text>
                <Text>{weatherDesc}</Text>
                <FlatList
                    style={{
                        backgroundColor: '#111111',
                        width: '100%'
                    }}
                    horizontal={true}
                    data={hourlyData}
                    renderItem={({ item }) => this.renderItem(item)}
                />
                <View height="60%">
                    <Text>湿度:{curItem?.humidity}</Text>
                    <Text>风速:{curItem?.wind_speed}</Text>
                    <Text>压强:{curItem?.pressure}</Text>
                </View>
            </View>
        );
    }
}

export default BroadcastDay;
