import * as React from "react"
import { observer } from "mobx-react-lite"
import {Image, TextStyle, View, ViewStyle} from "react-native"
import { Screen, Text, Button, Wallpaper } from "../../../components"
// import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import {palette} from "../../../theme/palette";
export const logo = require("./logo.png")
export interface MenuMainScreenProps {
  navigation: NavigationScreenProp<{}>
}

const FULL: ViewStyle = {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
}

const LOGO: ViewStyle = {
    resizeMode: "contain",
}

const LAUNCH: ViewStyle = {
    height: 50,
    color: palette.white,
    backgroundColor: palette.blue,
    borderRadius: 30,
}

const CONNECT: ViewStyle = {
    height: 50,
    color: palette.white,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: palette.white,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 20,
}

const BTN_TXT: TextStyle = {
    fontSize: 20,
    textTransform: "uppercase",
    padding: 20,
}


export const MenuMainScreen: React.FunctionComponent<MenuMainScreenProps> = observer((props) => {

  const launchGame = React.useMemo(() => () =>
    props.navigation.navigate("gameHomeScreen"), [props.navigation]
  )
  const launchEnigme = React.useMemo(() => () =>
    props.navigation.navigate("gameEnigmaColorCameraScreen"), [props.navigation]
  )



  return (
    <Screen style={FULL} preset="scroll">
      <Wallpaper />
      <View>
          <Image source={logo} style={LOGO}/>
      </View>
      <View>
          <Button
              style={CONNECT}
              onPress={launchEnigme}>
              <Text
                  style={BTN_TXT}
                  tx={"menuMainScreen.btnConnect"}/>
          </Button>
          <Button
              style={LAUNCH}
              onPress={launchGame}>
              <Text
                  style={BTN_TXT}
                  tx={"menuMainScreen.btnLaunchGame"}/>
          </Button>
      </View>
    </Screen>
  )
})
