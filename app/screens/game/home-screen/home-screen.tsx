import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, Button } from "../../../components"
import { color } from "../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../models/root-store"

export interface GameHomeScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  const store = useStores()
  console.log('Game' + store.itemCount)
  const finishEnigma = React.useMemo(() => () =>
    props.navigation.navigate("gameEnigmaEndFinishScreen"), [
    props.navigation,
  ])

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="gameHomeScreen.header"/>
      <Text preset="default">
        {store.itemCount}
      </Text>
      <Button onPress={finishEnigma} tx="gameHomeScreen.addItem"/>
    </Screen>
  )
})
