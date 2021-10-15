import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    ImageBackground
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
    getHourlyTempArr,
    getHourlyTimeHourArr,
    getSunsetSunriseTime
} from '../Utils/commonUtils';

let data = {
    labels: [],
    datasets: [
        {
            data: [],
            color: (opacity = 1) => `rgba(220, 00, 00, 0.5)`, // optional
            strokeWidth: 2 // optional
        }
    ]
    // legend: ['Hourly Temp'] // optional
};

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 00, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.9,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
        r: '2'
    },
    decimalPlaces: 0
};

class BroadcastDay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dayWeather = null;
        this.hourlyArr = [];
        this.flatListData = [];

        this.initData(props);
    }

    initData = (props) => {
        if (!props) {
            return;
        }
        this.dayWeather = props.route?.params?.dayWeather;
        this.hourlyArr = props.route?.params?.hourlyArr;
        let hourlyTempArr = getHourlyTempArr(this.hourlyArr);
        let hourlyTimeHour = getHourlyTimeHourArr(this.hourlyArr);
        console.log('++' + JSON.stringify(hourlyTimeHour));

        data.labels = hourlyTimeHour;
        data.datasets[0].data = hourlyTempArr;

        this.flatListData = [
            {
                key: 'Sunrise',
                value: getSunsetSunriseTime(this.dayWeather.sunrise)
            },
            {
                key: 'Sunset',
                value: getSunsetSunriseTime(this.dayWeather.sunset)
            },
            {
                key: 'Pressure',
                value: this.dayWeather.pressure
            },
            {
                key: 'Wind Speed',
                value: this.dayWeather.wind_speed
            },
            {
                key: 'Clouds',
                value: this.dayWeather.clouds
            }
        ];
    };

    componentDidMount() {}

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ImageBackground
                    source={require('../Assets/WeatherBg.png')}
                    style={{ width: '100%', height: '100%' }}
                >
                    {this.hourlyArr.length > 1 && (
                        <View>
                            <Text
                                style={{
                                    marginHorizontal: 20,
                                    marginVertical: 5,
                                    fontSize: 26
                                }}
                            >
                                Hourly
                            </Text>
                            <ScrollView
                                horizontal={true}
                                contentContainerStyle={{
                                    width: 800,
                                    height: 200
                                }}
                            >
                                <LineChart
                                    data={data}
                                    width={800}
                                    height={186}
                                    verticalLabelRotation={0}
                                    chartConfig={chartConfig}
                                    bezier
                                />
                            </ScrollView>
                        </View>
                    )}
                    {this.hourlyArr.length > 1 && (
                        <View>
                            <ScrollView
                                horizontal={true}
                                contentContainerStyle={{
                                    width: 800,
                                    height: 200
                                }}
                            ></ScrollView>
                        </View>
                    )}
                    <FlatList
                        data={this.flatListData}
                        renderItem={({ item }) => {
                            console.log('------' + item.key);
                            return this.renderItemList(item);
                        }}
                    ></FlatList>
                </ImageBackground>
            </View>
        );
    }

    renderHourlyTemp;

    renderItemList = (item) => {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    paddingHorizontal: 20,
                    paddingVertical: 5
                }}
            >
                <Text style={{ fontSize: 16, color: '#333' }}>{item.key}</Text>
                <Text style={{ fontSize: 26, color: '#333' }}>
                    {item.value}
                </Text>
                <View
                    style={{
                        width: '100%',
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: 'gray',
                        marginTop: 5
                    }}
                />
            </View>
        );
    };
}

export default BroadcastDay;
