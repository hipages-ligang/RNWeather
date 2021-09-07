import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "lightgray"
    }
})

class HomeScreen extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }
}

export default HomeScreen;