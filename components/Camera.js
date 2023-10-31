import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const Cameras = () => {
  const [startCamera, setStartCamera] = useState(false);
  const cameraRef = useRef(null);

  const handleCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      alert('Permission not granted');
    }
  };

  const toggleCameraType = () => {
    setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          style={{ flex: 1, width: '100%' }}
          type={Camera.Constants.Type.back} // or Camera.Constants.Type.front for front camera
          ref={(ref) => {
            cameraRef.current = ref;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.camera}>
          <TouchableOpacity onPress={handleCamera} style={styles.button}>
            <Text style={styles.text}>Take picture</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#14274e',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cameras;