import * as React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, TouchableOpacity, ViewStyle} from "react-native"
import { Screen, Text } from "../../../../components"
// import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import {palette} from "../../../../theme/palette";
import { RNCamera } from 'react-native-camera';
import App from "../../../../app";

import { ImageColorPicker } from 'react-native-image-color-picker';



export interface GameEnigmaColorCameraScreenProps {
  navigation: NavigationScreenProp<{}>
}

const FULL: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});



export const GameEnigmaColorCameraScreen: React.FunctionComponent<GameEnigmaColorCameraScreenProps> = observer((props) => {
    let camera



    let img = "https://s23527.pcdn.co/wp-content/uploads/2019/12/Downside-Up-745x449.jpg.optimal.jpg"

    let takePicture = async function (camera) {
        const options = {quality: 0.5, base64: true};
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        img = data.uri;
    }


    let pickerCallback = message => {
        if (message && message.nativeEvent && message.nativeEvent.data) {
            console.log(message.nativeEvent.data); // response from ImageColorPicker
        }
    };


  return (
    <Screen style={FULL} preset="scroll">

      <RNCamera
          ref={ref => {
             camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
      >

          <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
      </RNCamera>
    </Screen>
  )

})
