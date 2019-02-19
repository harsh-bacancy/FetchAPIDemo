//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
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
    var photo = '';
    {
      Platform.OS === 'android' ?
        photo = {
          uri: this.state.photo.uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        }
        :
        photo = {
          uri: this.state.photo.uri,
          filename: 'photo.jpg',
          name: 'photo.jpg',
        }
    }
    console.log('photo url', this.state.photo.uri)
    let data = new FormData();
    const h = {};
    h.Accept = 'application/json';
    data.append('file', photo)
    return fetch('https://pictshare.net/api/upload.php', { method: 'POST', headers: 'application/json', body: data })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, dataSource: responseJson }, function () { });
        console.log('---', this.state.dataSource.url)
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
      <View style={{ flex: 1,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text style={{ fontSize: 20 }}>{item}</Text>}
          keyExtractor={({ id }) => id}
        /> */}
        {/* <Text>{dataSource.url}</Text> */}
        <Image
            style={{ height: 100, width: 300 }}
            source={{ uri: `${dataSource.url}` }}
            resizeMode='cover'
          />
        <View style={{ backgroundColor: '#FFF', height:300, width: 300 }}>
          {photo &&
            <Image
              style={{ height: 150 , width: 250, margin: 30 }}
              source={{ uri: photo.uri }}
              resizeMode='contain'
            />
          }
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={this.handleChoosePhoto}
          >
            <Text style={{ fontSize: 20, marginHorizontal: 20, padding:10 }}>select Image</Text>
          </TouchableOpacity>
        </View>
       {photo && <TouchableOpacity
          onPress={this.handleselect}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>upload</Text>
        </TouchableOpacity>}
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
