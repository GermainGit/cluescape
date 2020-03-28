import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface GameEnigmaQuizzScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const GameEnigmaQuizzScreen: React.FunctionComponent<GameEnigmaQuizzScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="gameEnigmaQuizzScreen.header" />
    </Screen>
  )
})
