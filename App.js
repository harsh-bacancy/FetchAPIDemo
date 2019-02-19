//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';


// create a component
class FetchAPIDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      photo: null
    }
  }

  handleselect = () => {
    var photo = {
      uri: this.state.photo.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    }
    console.log('photo url', this.state.photo.uri)
    let data = new FormData();
    const h = {};
    h.Accept = 'application/json';
    data.append('file', photo)
    return fetch('https://pictshare.net/api/upload.php', { method: 'POST', headers: 'application/json', body: data })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, dataSource: responseJson.url }, function () { });
        console.log('---', this.state.dataSource)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { isLoading, photo, dataSource } = this.state
    if (false) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={this.handleChoosePhoto}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>select Image</Text>
        </TouchableOpacity>
        {photo && <TouchableOpacity
          onPress={this.handleselect}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>upload</Text>
        </TouchableOpacity>}
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text style={{ fontSize: 20 }}>{item}</Text>}
          keyExtractor={({ id }) => id}
        /> */}
        <Text>{dataSource}</Text>
        <View style={{ backgroundColor: 'red', height: 500, width: 400 }}>
          <Image
            style={{ height: 100, width: 200 }}
            source={{ uri: `${dataSource}` }}
            resizeMode='cover'
          />
          {photo &&
            <Image
              style={{ height: 100, width: 200, margin: 30 }}
              source={{ uri: photo.uri }}
              resizeMode='cover'
            />
          }

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
