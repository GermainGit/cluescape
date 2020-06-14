import * as React from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, SafeAreaView, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../../../components"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../../models/root-store"
import { Item } from "../../../../models/item"
import { TouchableNativeFeedback } from "react-native-gesture-handler"

export interface GameEnigmaEndFinishScreenProps {
  navigation: NavigationScreenProp<{}>,
  item: Item
}

const ROOT: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: '#121A19',
}

const TextViewStyle: ViewStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const TextEngimaComplete: TextStyle = {
  color: "#B69A7B",
  fontSize: 36
}

const ImageViewItem: ViewStyle = {
  marginTop: 10
}

const ImageItem: ImageStyle = {
  width: 64,
  height: 64
}

const TextNewItem: TextStyle = {
  color: "#736756",
}

export const GameEnigmaEndFinishScreen: React.FunctionComponent<GameEnigmaEndFinishScreenProps> = observer((props) => {
  const store = useStores()
  const goHome = React.useMemo(() => () =>
    props.navigation.navigate("gameHomeScreen"), [
    props.navigation,
  ])

  const item: Item = { name: "test", image: "../../assets/items/fuse.png" }

  if (
    store.items.find((storedItem) => item.name === storedItem.name)
  ) {
    goHome()
    return (<Screen preset="fixed">
    </Screen>)
  }

  store.addItem(item)

  return (
    <Screen style={ROOT} preset="fixed">
      <TouchableNativeFeedback onPress={goHome} style={TextViewStyle}>
        <Text
          preset="default"
          style={TextEngimaComplete}
          tx="gameEnigmaEndFinishScreen.completed"/>
        <Text
          preset="default"
          style={TextNewItem}
          tx="gameEnigmaEndFinishScreen.newItem"
        />
        <SafeAreaView style={ImageViewItem}>
          <Image style={ImageItem} source={require('../../assets/items/fuse.png')} />
        </SafeAreaView>
      </TouchableNativeFeedback>
    </Screen>
  )
})
