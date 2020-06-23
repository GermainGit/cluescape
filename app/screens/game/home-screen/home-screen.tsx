import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ImageStyle, ViewStyle } from "react-native"
import { Screen } from "../../../components"
import { color } from "../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../models/root-store"
// import QRCodeScanner from 'react-native-qrcode-scanner'
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
  backgroundColor: color.palette.black,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  const store = useStores()
  let camera;

  const launchEnigma = React.useMemo(
    () => () => {
      const enigma = store.enigmaStore.next()
      if (enigma.isEnigmaEnd()) {
        Alert.alert('End', 'Fin du jeu !')
      } else {
        props.navigation.navigate(enigma.screen)
      }
    },
    [props.navigation])

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
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onGoogleVisionBarcodesDetected={launchEnigma}
      >
      </RNCamera>

      {/*<Modal*/}
      {/*  animationType={"fade"}*/}
      {/*  visible={inventoryVisible}*/}
      {/*  transparent={true}*/}
      {/*>*/}
      {/*  <View style={ModalContainerView}>*/}
      {/*    <Inventory visible={setInventoryVisible}/>*/}
      {/*  </View>*/}
      {/*</Modal>*/}

      {/*<HelpQuit parentScreenNavProp={props.navigation} isEnigma={false}/>*/}

      {/*<View style={ScannerImageView}>*/}
      {/*  <Image style={ScannerImage} source={require("./scanner.png")}/>*/}
      {/*  <View style={ScannerMiddleView}/>*/}
      {/*</View>*/}

      {/*<Button style={InventoryView} onPress={openInventory}>*/}
      {/*  <Image source={require("./inventory.png")}/>*/}
      {/*</Button>*/}
    </Screen>
  )
})
