import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
    TouchableOpacity
} from 'react-native';
import { fetch7daysForecast } from './API/api';
import Colors from './Assets/Colors';
import { weatherData } from './Data/weatherData_7days';
import { getTimeStr } from './Utils/commonUtils';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    currentWeatherIcon: {
        width: 50,
        height: 50
    },
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

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            weatherDataObj: null
        };
    }

    componentDidMount() {
        this.updateWeather();
    }

    updateWeather = () => {
        fetch7daysForecast((data) => {
            if (data.success) {
                console.log('----update weather success!----');
                console.log(`-hourly count: ${data.value.hourly.length}`);
                this.setState({
                    weatherDataObj: data.value,
                    refreshing: false
                });
                return;
            }
            this.setState({
                refreshing: false
            });
        });
    };

    renderHeader = () => {
        const current = this.state.weatherDataObj?.current;
        const currentWeather = current?.weather[0];

        const hourly = this.state.weatherDataObj?.hourly;

        const temp = parseInt(current?.temp);
        const { navigation } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Day', { currentWeather, hourly });
                }}
            >
                <View style={styles.headerContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={styles.currentWeatherIcon}
                            source={{
                                uri: `https://openweathermap.org/img/wn/${currentWeather?.icon}@2x.png`
                            }}
                        />
                        <Text>{currentWeather?.main}</Text>
                    </View>
                    <Text style={{ fontSize: 30 }}>{temp} ℃</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderItem = (item) => {
        let weather = item?.weather[0];
        let maxTemp = item?.temp?.max;
        let minTemp = item?.temp?.min;
        let timeStr = getTimeStr(item?.dt);
        const { navigation } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Day');
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

    render() {
        const { refreshing, weatherDataObj } = this.state;
        const weatherList = weatherDataObj?.daily;
        return (
            <View style={styles.container}>
                <FlatList
                    style={{
                        width: '100%'
                    }}
                    data={weatherList}
                    ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => getTimeStr(item?.dt)}
                    refreshControl={
                        <RefreshControl
                            colors={[Colors.primary_medium]}
                            tintColor={Colors.primary_medium}
                            refreshing={refreshing}
                            onRefresh={() => {
                                console.log('refreshing');
                                this.setState({
                                    refreshing: true
                                });
                                this.updateWeather();
                            }}
                        />
                    }
                />
            </View>
        );
    }
}

export default HomeScreen;
