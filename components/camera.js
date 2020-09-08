import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

/* 
  Use React Native Camera for better camera functionality
  https://github.com/react-native-community/react-native-camera
*/

const CameraScreen = ({navigation}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 34,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 1,
  },
});

export default CameraScreen;
