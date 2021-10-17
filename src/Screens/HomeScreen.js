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
import { fetch7daysForecast, fetchTest } from '../API/api';
import Colors from '../Assets/Colors';
import { weatherData } from '../Data/weatherData_7days';
import { getTimeStr } from '../Utils/commonUtils';
import HomeScreenItem from './HomeScreenItem';

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
        // fetchTest()
        //     .then((data) => {
        //         if (data.success) {
        //             console.log('----update weather success!----');
        //             console.log(`-hourly count: ${data.value.hourly.length}`);
        //             this.setState({
        //                 weatherDataObj: data.value,
        //                 refreshing: false
        //             });
        //             return;
        //         }
        //         this.setState({
        //             refreshing: false
        //         });
        //     })
        //     .catch(() => {
        //         console.log('-=-=-=-=-=-=-=-=');
        //     });
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
        const temp = parseInt(current?.temp);
        const { navigation } = this.props;
        return (
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
        );
    };

    renderItem = (item, index) => {
        const hourly = this.state.weatherDataObj?.hourly;
        let hourlySlice = hourly.slice(index * 24, (index + 1) * 24 - 1);
        const { navigation } = this.props;
        return (
            <HomeScreenItem
                item={item}
                onPressCallback={() => {
                    navigation.navigate('Day', {
                        dayWeather: item,
                        hourlyArr: hourlySlice
                    });
                }}
            />
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
                    renderItem={({ item, index }) =>
                        this.renderItem(item, index)
                    }
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
