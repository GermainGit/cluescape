import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Animated, TextStyle, PanResponder } from "react-native"
import { Screen, Text } from "../../../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface GameEndAssemblyScreenProps {
  navigation: NavigationScreenProp<{}>,
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const BOX: ViewStyle = {
  backgroundColor: "skyblue",
  width: 30 * 2,
  height: 30 * 2,
  borderRadius: 30
}

const CONTAINER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center"
}

const TITLE_TEXT: TextStyle = {
  fontSize: 14,
  lineHeight: 24,
  fontWeight: "bold"
}

const TEXT_STYLE: TextStyle = {
  marginTop: 25,
  marginLeft: 5,
  marginRight: 5,
  textAlign: "center",
  color: "#fff",
  fontSize: 25,
  fontWeight: "bold"
}

const DROPZONE: ViewStyle = {
  position: "relative",
  top: 0,
  height: 200,
  backgroundColor: "#00334d"
}

export const GameEndAssemblyScreen: React.FunctionComponent<GameEndAssemblyScreenProps> = observer((props) => {
  const [showDraggable, setShowDraggable] = React.useState(true)

  const opacity = React.useRef(new Animated.Value(1)).current

  const pan = React.useRef(new Animated.ValueXY()).current

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.moveY < 220) {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000
          }).start(() => setShowDraggable(false))
        } else {
          Animated.spring(
            pan,
            { toValue: { x: 0, y: 0 } }
          ).start()
        }
      }
    })
  ).current

  return (
    <Screen style={ROOT} preset="fixed">
      <Text preset="header" tx="gameEndAssemblyScreen.header" />
      <View style={DROPZONE}>
        <Text style={ TEXT_STYLE }>Drop them here!</Text>
      </View>
      <View style={CONTAINER}>
        <Text style={TITLE_TEXT}>Drag this box!</Text>
        <Animated.View
          style={[
            { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
            { opacity: opacity }
          ]}
          {...panResponder.panHandlers} >
          <View style={BOX} />
        </Animated.View>
      </View>
    </Screen>
  )
})
