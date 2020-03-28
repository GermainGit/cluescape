import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, Button } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface MenuMainScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const MenuMainScreen: React.FunctionComponent<MenuMainScreenProps> = observer((props) => {

  const launchGame = React.useMemo( () => () =>
    props.navigation.navigate("gameHomeScreen"), [
      props.navigation,
    ])
  // const { someStore } = useStores()=> 
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="menuMainScreen.header" />
      <Button 
        onPress={launchGame}
        tx={"menuMainScreen.btnLaunchGame"}
      >
      </Button>
    </Screen>
  )
})
