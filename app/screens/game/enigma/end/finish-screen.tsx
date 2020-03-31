import * as React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../../../components"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../../models/root-store"
import { Item } from "../../../../models/item"

export interface GameEnigmaEndFinishScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color.palette.black,
}

const TextViewStyle: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const GameEnigmaEndFinishScreen: React.FunctionComponent<GameEnigmaEndFinishScreenProps> = observer((props) => {
  const store = useStores()

  const goHome = React.useMemo(() => () =>
    props.navigation.navigate("gameHomeScreen"), [
    props.navigation,
  ])

  const handleItemCick = () => {
    const item: Item = { name: 'test', image: 'image.png' }
    store.addItem(item)
    console.log('Finish' + store.itemCount)
    goHome()
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <View style={TextViewStyle}>
        <Text preset="default" tx="gameEnigmaEndFinishScreen.completed" />
        <Text preset="default" tx="gameEnigmaEndFinishScreen.newItem"/>
        <Button onPress={handleItemCick} tx="gameHomeScreen.addItem"/>
      </View>
    </Screen>
  )
})
