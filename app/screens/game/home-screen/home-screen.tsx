import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, Image, ImageStyle, Modal, StyleSheet, View, ViewStyle } from "react-native"
import { Button, HelpQuit, Inventory, Screen } from "../../../components"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../models/root-store"
import { RNCamera } from "react-native-camera"

export interface GameHomeScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ScannerImageView: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const ScannerImage: ImageStyle = {
  resizeMode: "contain",
  height: 250,
  width: 250,
}

const ScannerMiddleView: ViewStyle = {
  position: "absolute",
  borderRadius: 50,
  height: 24,
  width: 24,

  borderWidth: 4,
  borderColor: "rgba(247, 248, 233, 0.68)",

  backgroundColor: "#F7F8E9",
}

const InventoryView: ViewStyle = {
  position: "absolute",
  bottom: 50,
  alignSelf: "center",
  borderRadius: 50,
  height: 80,
  width: 80,

  backgroundColor: "#1F2F33",
}

const ModalContainerView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const styles = StyleSheet.create({
  preview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5
  const CAM_VIEW_WIDTH = Dimensions.get('screen').width

  const leftMargin = (CAM_VIEW_WIDTH - 250) / 2
  const topMargin = (CAM_VIEW_HEIGHT - 250) / 2

  const scanAreaX = leftMargin / CAM_VIEW_HEIGHT
  const scanAreaY = topMargin / CAM_VIEW_WIDTH

  const enigmaStore = useStores().enigmaStore
  let camera

  const launchEnigma = ({ barcodes }) => {
    barcodes.forEach(barcode => {
      const enigma = enigmaStore.get(barcode.data)
      if (enigma) {
        if (!enigma.isFinish) {
          props.navigation.navigate(enigma.screen)
        } else if (!enigmaStore.remaining() && enigma.isEnigmaEnd()) {
          props.navigation.navigate(enigma.screen)
        }
      }
    })
  }

  const [inventoryVisible, setInventoryVisible] = useState(false)

  const openInventory = function() {
    setInventoryVisible(true)
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <RNCamera
        ref={ref => {
          camera = ref
        }}
        rectOfInterest={{ x: scanAreaX, y: scanAreaY, width: 0.5, height: 0.5 }}
        cameraViewDimensions={{
          width: CAM_VIEW_WIDTH,
          height: CAM_VIEW_HEIGHT,
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onGoogleVisionBarcodesDetected={launchEnigma}
        captureAudio={false}
      >
        <Modal
          animationType={"fade"}
          visible={inventoryVisible}
          transparent={true}
        >
          <View style={ModalContainerView}>
            <Inventory visible={setInventoryVisible}/>
          </View>
        </Modal>

        <View style={ROOT}>
          <HelpQuit parentScreenNavProp={props.navigation} isEnigma={false}/>

          <View style={ScannerImageView}>
            <Image style={ScannerImage} source={require("./scanner.png")}/>
            <View style={ScannerMiddleView}/>
          </View>

          <Button style={InventoryView} onPress={openInventory}>
            <Image source={require("./inventory.png")}/>
          </Button>
        </View>

      </RNCamera>

    </Screen>
  )
})
