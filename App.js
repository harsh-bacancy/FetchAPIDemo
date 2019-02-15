//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

// create a component
class FetchAPIDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount() {
    return fetch('https://pictshare.net/api/geturl.php?url=https://pictshare.net//8n8xib.jpg')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, dataSource: responseJson.url }, function () { });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <Text>data Loaded</Text>
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text style={{ fontSize: 20 }}>{item}</Text>}
          keyExtractor={({ id }) => id}
        /> */}
        <Text>{this.state.dataSource}</Text>
        <View style={{ backgroundColor: 'red', height: 500, width: 400 }}>
          <Image
            style={{ height: 100,width: 200 }}
            source={{ uri: `${this.state.dataSource}` }}
            resizeMode='cover'
          />
        </View>
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
});

//make this component available to the app
export default FetchAPIDemo;
