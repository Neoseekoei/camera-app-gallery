import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const Cam = ({navigation}) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    const sharePic = async () => {
      await shareAsync(photo.uri);
      setPhoto(null);
    };

    const savePhoto = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setPhoto(null);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        <View style={styles.btn}>
        <TouchableOpacity style={styles.button} onPress={sharePic}>
          <Text>Share</Text>
        </TouchableOpacity>
        {hasMediaLibraryPermission ? (
          <TouchableOpacity style={styles.button} onPress={savePhoto}>
            <Text>Save</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
          <Text>Delete</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.btnPic1}></TouchableOpacity>
        <TouchableOpacity style={styles.btnPic} onPress={takePicture}>  
        </TouchableOpacity>

      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  preview: {
    width: 300,
    height: 400,
    resizeMode: 'cover',
  },
  btn: {
    flexDirection: 'row'
  },
  btnPic:{
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 60,
  },
  btnPic1:{
    backgroundColor: "#000",
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 40,
    marginTop: 10,
    
  }


  
});

export default Cam;