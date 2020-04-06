import * as React from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageBackground, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen } from "../../../components"
import { color } from "../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface MenuMainScreenProps {
  navigation: NavigationScreenProp<{}>
}

const SettingActionView: ViewStyle = {
  position: "absolute",
  left: 15,
  top: 20,
  backgroundColor: "transparent",
}

const UserActionView: ViewStyle = {
  position: "absolute",
  right: 15,
  top: 20,
  backgroundColor: "transparent",
}

const ActionImage: ImageStyle = {
  resizeMode: "contain",
  height: 32,
  width: 32,
}

const LogoView: ViewStyle = {
  position: "absolute",
  alignSelf: "center",
  top: 185,
}

const LogoImage: ImageStyle = {
  resizeMode: "contain",
  width: 170,
  height: 170,
}

const StartGameActionView: ViewStyle = {
  position: "absolute",
  bottom: 130,
  alignSelf: "center",
  backgroundColor: "#83949B",
  width: 250,
  height: 55,
  borderRadius: 30,
  borderColor: "#707070",
  borderWidth: 6,
}

const StartGameActionText: TextStyle = {
  fontSize: 20,
}

const ROOT: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  backgroundColor: color.palette.black,
}

const StartGameImageView: ViewStyle = {
  position: "absolute",
  bottom: 130,
  alignSelf: "center",
}

const StartGameImage: ImageStyle = {
  resizeMode: "contain",
  width: 300,
  height: 55,
}

const ImageBackgroundStyle: ImageStyle = {
  flex: 1,
  justifyContent: "center",
  resizeMode: "cover",
}

export const MenuMainScreen: React.FunctionComponent<MenuMainScreenProps> = observer((props) => {
  const launchGame = React.useMemo(() => () =>
    props.navigation.navigate("gameHomeScreen"), [
    props.navigation,
  ])

  const showActionImage = true

  return (
    <Screen style={ROOT} preset="fixed">
      <ImageBackground source={require("./bg.png")} style={ImageBackgroundStyle}>
        <Button style={SettingActionView}>
          <Image style={ActionImage} source={require("./gear.png")}/>
        </Button>
        <Button style={UserActionView}>
          <Image style={ActionImage} source={require("./user.png")}/>
        </Button>
        <View style={LogoView}>
          <Image style={LogoImage} source={require("./logo_light.png")}/>
        </View>
        <View style={StartGameImageView}>
          {showActionImage &&
          <Image style={StartGameImage} source={require("./paillette_dans_ma_vie.png")}/>}
        </View>
        <Button
          style={StartGameActionView}
          textStyle={StartGameActionText}
          onPress={launchGame}
          tx={"menuMainScreen.btnLaunchGame"}
        />

      </ImageBackground>
    </Screen>
  )
})
