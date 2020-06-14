import * as React from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, SafeAreaView, TextStyle, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../../../components"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../../models/root-store"
import { TouchableNativeFeedback } from "react-native-gesture-handler"

export interface GameEnigmaEndFinishScreenProps {
  navigation: NavigationScreenProp<{}>
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
  width: 128,
  height: 128,
}

const TextNewItem: TextStyle = {
  color: "#736756",
}

export const GameEnigmaEndFinishScreen: React.FunctionComponent<GameEnigmaEndFinishScreenProps> = observer((props) => {
  const itemStore = useStores().itemStore
  const goHome = React.useMemo(() => () =>
    props.navigation.navigate("gameHomeScreen"), [
    props.navigation,
  ])

  const item = itemStore.getReward()
  item.setOwned()


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
          <Icon style={ImageItem} icon={item.name}/>
        </SafeAreaView>
      </TouchableNativeFeedback>
    </Screen>
  )
})
