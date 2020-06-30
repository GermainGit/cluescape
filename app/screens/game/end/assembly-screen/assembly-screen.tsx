import * as React from "react"
import { observer } from "mobx-react-lite"
import { Animated, PanResponder, PanResponderGestureState, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Item, Wallpaper } from "../../../../components"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { useStores } from "../../../../models/root-store"

export interface GameEndAssemblyScreenProps {
  navigation: NavigationScreenProp<{}>,
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
}

const FULL: ViewStyle = {
  flex: 1
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
  backgroundColor: "#00334d",
  opacity: 0.4
}

function isDropArea(gesture: PanResponderGestureState) {
  return gesture.moveY < 200
}

function Draggable(props, onDrop) {
  // const ADAPTED = selected ? SELECTED_ITEM : NOT_SELECTED_ITEM
  const [showDraggable, setShowDraggable] = React.useState(true)

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

  const opacity = React.useRef(new Animated.Value(1)).current

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
        if (isDropArea(gesture)) {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000
          }).start(() => {
            setShowDraggable(false)
          })
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start()
        }
      }
    })
  ).current

  return (
    (showDraggable) &&
    (<Animated.View
      style={[
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        { opacity: opacity }
      ]}
      {...panResponder.panHandlers} >
      <Item item={props.item}></Item>
    </Animated.View>)
  )
}

export const GameEndAssemblyScreen: React.FunctionComponent<GameEndAssemblyScreenProps> = observer((props) => {
  const itemStore = useStores().itemStore

  const imageSource = require("./moteur_propre.jpg")
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper backgroundImage={imageSource}/>
      <Text preset="header" tx="gameEndAssemblyScreen.header" />
      <View style={DROPZONE}>
        <Text style={ TEXT_STYLE }>Pose tes éléments dans cette zone!</Text>
      </View>
      <View style={CONTAINER}>
        <Text style={TITLE_TEXT}>Inventaire</Text>
        { itemStore.items.map(item => (
          // eslint-disable-next-line react/jsx-key
          <Draggable item={item}/>
        ))}
      </View>
    </Screen>
  )
})
