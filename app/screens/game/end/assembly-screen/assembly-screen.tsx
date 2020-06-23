import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Animated, TextStyle, PanResponder } from "react-native"
import { Screen, Text } from "../../../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface GameEndAssemblyScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.black,
}

const BOX: ViewStyle = {
  backgroundColor: "skyblue",
  width: 20 * 2,
  height: 20 * 2,
  borderRadius: 10
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
  height: 200,
  backgroundColor: "#00334d"
}

export const GameEndAssemblyScreen: React.FunctionComponent<GameEndAssemblyScreenProps> = observer((props) => {
  const pan = React.useRef(new Animated.ValueXY()).current

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value
        })
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        // pan.flattenOffset()
        Animated.spring(pan, {
          toValue: {
            x: (pan.x as any)._value,
            y: (pan.y as any)._value
          },
          friction: 5
        }).start()
      }
    })
  ).current

  return (
    <Screen style={ROOT} preset="fixed">
      <Text preset="header" tx="gameEndAssemblyScreen.header" />
      <View style={CONTAINER}>
        <Text style={TITLE_TEXT}>Drag this box!</Text>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}
        >
          <View style={BOX} />
        </Animated.View>
      </View>
      <View style={DROPZONE}>
        <Text style={TEXT_STYLE}>Drop them here!</Text>
      </View>
    </Screen>
  )
})
