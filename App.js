//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity, Platform, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';


// create a component
class FetchAPIDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      photo: null,
      text: '',
      isEditable: true
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
    return fetch('https://pictshare.net/api/upload.php', { method: 'POST', headers: { 'Accept': 'application/json' }, body: data })
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
        this.setState({ photo: response, isLoading: true });
        this.handleselect()
      }
    });
  };

  render() {
    const { isLoading, photo, dataSource, isEditable, text } = this.state
    if (false) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <View style={{ flex: 1, margin: 10, width: '100%', alignItems: 'center', }}>
          {!isLoading ?
            <TouchableOpacity
              onPress={this.handleChoosePhoto}
            >
              <View style={{ height: 130, width: 130, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderColor: '#DDD', borderWidth: 2, }}>
                <Image
                  style={{ height: 120, width: 120, borderRadius: 60, margin: 2, borderWidth: 2, padding: 5 }}
                  source={{ uri: `${dataSource.url}` }}
                  resizeMode='cover'
                />
              </View>
            </TouchableOpacity>
            :
            <View style={{ height: 130, width: 130, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderColor: '#DDD', borderWidth: 2, }}>
              <ActivityIndicator />
            </View>
          }

          {isEditable ?
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
              <TextInput
                placeholder='Ex. John'
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                style={{ height: 50, borderBottomColor: '#0054b4', borderBottomWidth: 2, width: '70 %', fontSize: 20 }}
              />
              <TouchableOpacity
                onPress={() => this.setState({ isEditable: false })}
              >
                <Image
                  style={{ height: 20, width: 20, }}
                  source={require('./src/assets/image/ic_check-mark.png')}
                />
              </TouchableOpacity>
            </View>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
              <Text style={{fontSize :20,padding:10}}>{text}</Text>
              <TouchableOpacity
                onPress={() => this.setState({ isEditable: true })}
              >
                <Image
                  style={{ height: 20, width: 20, }}
                  source={require('./src/assets/image/ic_pencil-edit-button.png')}
                />
              </TouchableOpacity>
            </View>
          }

        </View>
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text style={{ fontSize: 20 }}>{item}</Text>}
          keyExtractor={({ id }) => id}
        /> */}
        {/* <Text>{dataSource.url}</Text> */}
        {/* <View style={{ backgroundColor: '#FFF', height: 300, width: 300, }}>
          {photo &&
            <Image
              style={{ height: 150, width: 250, margin: 30, backgroundColor: '#FFFFFF90' }}
              source={{ uri: photo.uri }}
              resizeMode='contain'
            />
          }
        </View> */}

        {/* <TouchableOpacity
          onPress={this.handleChoosePhoto}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20, padding: 10 }}>select Image</Text>
        </TouchableOpacity> */}

        {/* {photo && <TouchableOpacity
          onPress={this.handleselect}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>upload</Text>
        </TouchableOpacity>} */}
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
