import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface MenuSettingsSettingsScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const MenuSettingsSettingsScreen: React.FunctionComponent<MenuSettingsSettingsScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="menuSettingsSettingsScreen.header" />
    </Screen>
  )
})
