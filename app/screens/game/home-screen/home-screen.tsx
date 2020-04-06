import * as React from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../../components"
import { color } from "../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface GameHomeScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ActionView: ViewStyle = {
  position: "absolute",
  top: 15,
  right: 0,

  flexDirection: "column",
  justifyContent: "space-around",
  marginRight: -30,
}

const ButtonActionView: ViewStyle = {
  borderRadius: 20,
  width: 100,
  height: 40,

  marginBottom: 20,

  alignItems: "flex-start",
  paddingLeft: 20,
}

const ButtonActionDarkView: ViewStyle = {
  backgroundColor: "#1F2F33",
}

const ButtonActionLightView: ViewStyle = {
  backgroundColor: "#83949B",
}

const ActionImage: ImageStyle = {
  height: 24,
  width: 24,
}

const ActionText: TextStyle = {
  fontSize: 32,
}

const ScannerImageView: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const ScannerImage: ImageStyle = {
  resizeMode: "contain",
  height: 224,
  width: 224,
}

const ScannerMiddleView: ViewStyle = {
  borderRadius: 50,
  height: 24,
  width: 24,

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

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={ActionView}>
        <Button style={[ButtonActionView, ButtonActionDarkView]}><Image style={ActionImage}
                                                                        source={require("./cross.png")}/></Button>
        <Button style={[ButtonActionView, ButtonActionLightView]}>
          <Text style={ActionText}>?</Text>
        </Button>
      </View>

      <View style={ScannerImageView}>
        <Image style={ScannerImage} source={require("./scanner.png")}/>
        <View style={ScannerMiddleView}/>
      </View>
      <Button style={InventoryView}>
        <Image source={require("./inventory.png")}/>
      </Button>
    </Screen>
  )
})
