import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const Gallery = () => {
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
      });
      setGalleryPhotos(assets);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={galleryPhotos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.imageContainer}>
            <Image style={styles.galleryImage} source={{ uri: item.uri }} />
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    margin: 1,
  },
  galleryImage: {
    flex: 1,
    aspectRatio: 1, 
  },
});

export default Gallery;