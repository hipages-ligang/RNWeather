import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image
} from 'react-native';
import Colors from './Assets/Colors';
import { weatherData } from './Data/weatherData_7days';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.cardBg,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false
        };
    }

    renderItem = (item) => {
        let weather = item?.weather[0];
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
                    }}
                />
                <View>
                    <Text>{weather.main}</Text>
                    <Text>{weather.description}</Text>
                </View>
            </View>
        );
    };

    render() {
        const { refreshing } = this.state;
        const weatherList = weatherData?.list;
        return (
            <View style={styles.container}>
                <FlatList
                    style={{
                        width: '100%'
                    }}
                    data={weatherList}
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
                                setTimeout(() => {
                                    this.setState({
                                        refreshing: false
                                    });
                                }, 2000);
                            }}
                        />
                    }
                />
            </View>
        );
    }
}

export default HomeScreen;
