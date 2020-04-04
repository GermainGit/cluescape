import * as React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
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

const ItemCountView: ViewStyle = {
  position: "absolute",
  top: 10,
  left: 10,
  borderRadius: 5,
  backgroundColor: color.palette.white,
  padding: 10,
}

const ItemCountText: TextStyle = {
  color: color.palette.black,
}

const ButtonView: ViewStyle = {
  position: "absolute",
  bottom: 0,
}

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  const store = useStores()
  const finishEnigma = React.useMemo(() => () =>
    props.navigation.navigate("gameEnigmaEndFinishScreen"), [
    props.navigation,
  ])

  return (
    <Screen style={ROOT} preset="fixed">
      <View style={ItemCountView}>
        <Text preset="default" style={ItemCountText}>
          {store.itemCount}
        </Text>
      </View>
      <View style={ButtonView}>
        <Button onPress={finishEnigma} tx="gameHomeScreen.addItem"/>
        <Button onPress={() => store.resetItem()} tx="gameHomeScreen.resetItem"/>
      </View>
    </Screen>
  )
})
