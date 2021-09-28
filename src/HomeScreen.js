import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image
} from 'react-native';
import { fetch7daysForecast } from './API/api';
import Colors from './Assets/Colors';
import { weatherData } from './Data/weatherData_7days';
import { cToF, fToC, getTimeStr } from './Utils/commonUtils';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
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
        const temp = current?.temp;
        return (
            <View
                style={{
                    width: '100%',
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        );
    };

    renderItem = (item) => {
        let weather = item?.weather[0];
        let timeStr = getTimeStr(item?.dt);
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={styles.itemWeatherIcon}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
                    }}
                />
                <View>
                    <Text>{weather.main}</Text>
                    <Text>{weather.description}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text>{timeStr}</Text>
                </View>
            </View>
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
