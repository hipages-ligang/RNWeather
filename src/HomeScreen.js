import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#eeeeee",
        alignItems: "center",
        justifyContent: "center"
    },
    view: {
        ...StyleSheet.container,
        backgroundColor: "red"
    }
})

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.title = "React Native Workshop"

        this.state = {
            titleLabelColor: "red"
        }
    }

    onButtonPressed = () => {
        this.setState({
            titleLabelColor: "yellow"
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: this.state.titleLabelColor}}>{this.title}</Text>
                <Button title="button" onPress={() => {
                    this.onButtonPressed()
                }}/>
            </View>
        );
    }
}

export default HomeScreen;
