import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, View, TextStyle } from "react-native"
import { Screen, Text, Button } from "../../../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface GameHomeScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const HOME_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.black,
}

const HOME_CONTENT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const TEST_BUTTON_VIEW: ViewStyle = {
  backgroundColor: color.palette.black,
}

const TEST_BUTTON_TEXT: TextStyle = {
  backgroundColor: color.palette.black,
}

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  // const { someStore } = useStores()

  const testQuizz = React.useMemo(
    () => () => props.navigation.navigate("gameEnigmaQuizzScreen"),
    [props.navigation]
  )

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="gameHomeScreen.header" />
      <SafeAreaView style={HOME_CONTAINER}>
        <View style={HOME_CONTENT}>
          <Button
            style={TEST_BUTTON_VIEW}
            textStyle={TEST_BUTTON_TEXT}
            tx="gameHomeScreen.testQuizz"
            onPress={testQuizz}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
})
