import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ImageBackground
} from 'react-native';
import { getTimeStr, getHourTimeStr } from './Utils/commonUtils';
import Colors from './Assets/Colors';
const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: 'center'
    },

    dataHeader: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    dataHeaderTextStyle: {
        color: Color.white,
        fontSize: 18,
        marginBottom: 8
    },

    currentWeatherIcon: {
        width: 80,
        height: 80
    },

    hourlyItem: {
        width: 80,
        alignItems: 'center'
    },

    itemWeatherIcon: {
        width: 50,
        height: 50
    },

    dataFooter: {
        height: '20%',
        paddingTop: 18,
        paddingHorizontal: 20,
        marginBottom: '30%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    dataFooterTextLeft: {
        flex: 0.5,
        color: Colors.white,
        textAlign: 'left',
        fontSize: 18
    },

    dataFooterTextRight: {
        flex: 0.5,
        color: Colors.white,
        textAlign: 'right',
        fontSize: 18
    }
});

const bgImage = require('./Image/rbweather_bg.png');

class BroadcastDay extends Component {
    static navigationOptions = {
        title: 'Great'
    };
    constructor(props) {
        super(props);
        this.state = {};
        this.currentWeather = props.route?.params?.current;
        this.hourly = props.route?.params?.hourly;
        this.dayWeather = props.route?.params?.item;
    }

    componentDidMount() {}

    renderItem = (item) => {
        let timeStr = getHourTimeStr(item?.dt);
        let icon = item?.weather[0].icon;
        let temp = parseInt(item?.temp);
        return (
            <View style={styles.hourlyItem}>
                <Text style={{ color: Colors.white, fontSize: 16 }}>
                    {timeStr}
                </Text>
                <Image
                    style={styles.itemWeatherIcon}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${icon}@2x.png`
                    }}
                />
                <Text style={{ color: Colors.white, fontSize: 16 }}>
                    {temp}℃
                </Text>
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
                <ImageBackground
                    source={bgImage}
                    resizeMode="cover"
                    style={styles.bgImage}
                >
                    <View style={styles.dataHeader}>
                        <Text style={styles.dataHeaderTextStyle}>
                            {timeStr}
                        </Text>
                        <Image
                            style={styles.currentWeatherIcon}
                            source={{
                                uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
                            }}
                        />
                        <Text style={styles.dataHeaderTextStyle}>
                            {weatherTitle}
                        </Text>
                        <Text style={styles.dataHeaderTextStyle}>
                            {weatherDesc}
                        </Text>
                    </View>
                    <View>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={hourlyData}
                            renderItem={({ item }) => this.renderItem(item)}
                        />
                    </View>
                    <View style={styles.dataFooter}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.dataFooterTextLeft}>湿度</Text>
                            <Text style={styles.dataFooterTextRight}>
                                {curItem?.humidity}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.dataFooterTextLeft}>风速</Text>
                            <Text style={styles.dataFooterTextRight}>
                                {curItem?.wind_speed}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.dataFooterTextLeft}>压强</Text>
                            <Text style={styles.dataFooterTextRight}>
                                {curItem?.pressure}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default BroadcastDay;
