import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from './Assets/Colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const DATA = [
    {
        title: 'title1',
        description: 'afafjakldfajdfkjas'
    },
    {
        title: 'title2',
        description: 'afafjakldfajdfkjas'
    },
    {
        title: 'title3',
        description: 'afafjakldfajdfkjas'
    },
    {
        title: 'title4',
        description: 'afafjakldfajdfkjas'
    },
    {
        title: 'title5',
        description: 'afafjakldfajdfkjas'
    }
];

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderItem = (item) => {
        return (
            <View
                style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: Colors.cardBg,
                    padding: 20
                }}
            >
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{
                        width: '100%'
                    }}
                    data={DATA}
                    renderItem={({ item }) => this.renderItem(item)}
                />
            </View>
        );
    }
}

export default HomeScreen;
