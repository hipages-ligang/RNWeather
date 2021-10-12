import React, { Component } from 'react';
import { View, Text } from 'react-native';

class BroadcastToday extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.currentWeather = null;
        this.hourly = [];
    }

    componentDidMount() {
        this.currentWeather = this.props.route?.params?.currentWeather;
        this.hourly = this.props.route?.params?.hourly;
        console.log(
            '---' +
                JSON.stringify(this.currentWeather) +
                '----' +
                this.hourly.length
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>asfadsfa</Text>
            </View>
        );
    }
}

export default BroadcastToday;
