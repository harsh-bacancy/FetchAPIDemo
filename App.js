//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity, Platform, TextInput, Modal } from 'react-native';
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
      isEditable: true,
      uploaded: false,
      TextInputVisible: false
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
        this.setState({ photo: response, isLoading: true, uploaded: true });
        this.handleselect()
      }
    });
  };

  render() {
    const { isLoading, photo, dataSource, isEditable, text, uploaded, TextInputVisible } = this.state

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {/* Modal start */}
        <Modal
          visible={!TextInputVisible}
          transparent={true}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2,backgroundColor:'yellow' }}>
              <TouchableOpacity
              style={{flex:1 ,backgroundColor: 'gray'}}
              ></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
              <TextInput
                placeholder='Ex. John'
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                style={{ height: 50, borderBottomColor: '#0054b4', borderBottomWidth: 2, width: '70 %', fontSize: 20, textAlign: 'center' }}
              />
            </View>
          </View>
        </Modal>
        {/* Modal end */}
        <View style={{ flex: 1, margin: 10, width: '100%', alignItems: 'center', }}>
          {!isLoading ?
            <TouchableOpacity
              onPress={this.handleChoosePhoto}
            >
              <View style={{ height: 130, width: 130, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderColor: '#DDD', borderWidth: 2, }}>
                <Image
                  style={{ height: 120, width: 120, borderRadius: 60, margin: 2, borderWidth: 2, padding: 5, zIndex: 1, position: 'absolute' }}
                  source={{ uri: `${dataSource.url}` }}
                  resizeMode='cover'
                />
                <View style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: '#FFFFFF90', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
                  <Image
                    style={uploaded ? { height: 22, width: 22, justifyContent: 'flex-end', position: 'absolute' } : { height: 40, width: 40, justifyContent: 'flex-end', position: 'absolute' }}
                    source={uploaded ? require('./src/assets/image/ic_pencil-edit-button.png') : require('./src/assets/image/ic_upload_image.png')}
                    resizeMode='cover'
                  />
                </View>
              </View>
            </TouchableOpacity>
            :
            <View style={{ height: 130, width: 130, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderColor: '#DDD', borderWidth: 2, }}>
              <Image
                style={{ height: 120, width: 120, borderRadius: 60, margin: 2, borderWidth: 2, padding: 5, zIndex: 1, position: 'absolute' }}
                source={{ uri: `${dataSource.url}` }}
                resizeMode='cover'
              />
              <View style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: '#FFFFFF90', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
                <ActivityIndicator />
              </View>
            </View>
          }

          {isEditable ?
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
              <TextInput
                placeholder='Ex. John'
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                style={{ height: 50, borderBottomColor: '#0054b4', borderBottomWidth: 2, width: '70 %', fontSize: 20, textAlign: 'center' }}
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
              <Text style={{ fontSize: 20, padding: 10 }}>{text}</Text>
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
