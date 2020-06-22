import * as React from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  FlatList,
  Image,
  ImageStyle,
  SafeAreaView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Button, Header, HelpQuit, Screen, Text, Wallpaper } from "../../../../components"
import { color, spacing } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { palette } from "../../../../theme/palette"
import { useStores } from "../../../../models/root-store"

const character = require("./character3.png")

const FULL: ViewStyle = {
  flex: 1,
}

const QUIZZ_CONTAINER: ViewStyle = {}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}

const BOLD: TextStyle = {
  fontWeight: "bold"
}

const HEADER: TextStyle = {
  paddingTop: spacing[6],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
  marginTop: spacing[1]
}

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 20,
  textAlign: "center",
  letterSpacing: 1.5,
}

const DIMENSIONS = {
  width: 32,
  height: 32
}

const RESPONSES_CONTAINER: ViewStyle = {}

const RESPONSE: ViewStyle = {
  flexDirection: "row",
  alignSelf: "flex-start",
  backgroundColor: color.palette.lightGrey,
  marginBottom: spacing[2],
  marginRight: spacing[3],
  marginLeft: spacing[4],
  paddingTop: spacing[1],
  paddingBottom: spacing[1],
  paddingRight: spacing[1],
  paddingLeft: spacing[1],
  borderRadius: 25,
  width: 210
}

const SELECTED_RESPONSE: ViewStyle = {
  backgroundColor: "rgba(147, 157, 167, 1)",
  marginLeft: spacing[0],
  paddingTop: spacing[2],
  paddingBottom: spacing[2],
  paddingRight: spacing[2],
  paddingLeft: spacing[2],
  width: 240,

}

const NOT_SELECTED_RESPONSE: ViewStyle = {
  backgroundColor: "rgba(147, 157, 167, 0.6)",
  width: 210
}

const RESPONSE_CONTENT: TextStyle = {
  paddingLeft: spacing[2],
  paddingTop: spacing[3],
  ...TEXT,
  fontSize: 18,
  lineHeight: 15,
}

const RESPONSE_BUTTON: ViewStyle = {
  ...DIMENSIONS,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: palette.offWhite,
  borderRadius: 50,
}

const RESPONSE_BUTTON_FILL: ViewStyle = {
  width: DIMENSIONS.width - 6,
  height: DIMENSIONS.height - 6,
  backgroundColor: palette.offWhite,
  borderRadius: 50
}

const QUESTION_STYLE: TextStyle = {
  marginBottom: spacing[4],
  ...TEXT,
  ...BOLD,
  fontSize: 18,
  letterSpacing: 1.5,
}

const SUBMIT_BUTTON: ViewStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[5] + spacing[3],
  marginRight: spacing[8],
  marginLeft: spacing[8],
  backgroundColor: color.transparent,
  borderWidth: 1,
  borderColor: palette.offWhite,
}

const SUBMIT_BUTTON_CONTENT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const CHARACTER_IMAGE: ImageStyle = {
  height: 203
}

const CHARACTER: ViewStyle = {
  position: "absolute",
  right: 5,
  bottom: 0
}

const QUIZZ: ViewStyle = {
  backgroundColor: "rgba(147, 157, 167, 0.7)",
  marginTop: spacing[7] + spacing[2],
  borderRadius: 5,
  paddingHorizontal: spacing[6],
  marginRight: spacing[7],
  marginLeft: spacing[7],
}

// TODO: Externaliser
function Item({ id, title, selected, onSelect }) {
  const ADAPTED = selected ? SELECTED_RESPONSE : NOT_SELECTED_RESPONSE

  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        RESPONSE,
        ADAPTED
      ]}>
      <View style={RESPONSE_BUTTON}>{selected ? <View style={RESPONSE_BUTTON_FILL} /> : null}</View>
      <Text style={RESPONSE_CONTENT}>{title}</Text>
    </TouchableOpacity>
  )
}

export interface GameEnigmaQuizzScreenProps {
  navigation: NavigationScreenProp<{}>
}

export const GameEnigmaQuizzScreen: React.FunctionComponent<GameEnigmaQuizzScreenProps> = observer((props) => {
  const store = useStores()

  const enigma = store.enigmaStore.find(store.enigmaStore.currentEnigmaName)
  store.itemStore.setReward(enigma.item)

  const answers = [
    {
      id: "0",
      title: "Once",
    },
    {
      id: "1",
      title: "Twice",
    },
    {
      id: '2',
      title: 'Never',
    },
    {
      id: '3',
      title: 'I always react',
    }
  ]

  const question = {
    title: "Have you ever try React ?",
  }

  const [selected, setSelected] = React.useState(new Map())

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map()
      newSelected.set(id, !selected.get(id))

      setSelected(newSelected)
    },
    [selected],
  )

  const submit = React.useMemo(
    () => () => {
      if (selected.has("0")) {
        enigma.isFinish = true
        store.enigmaStore.next()
        props.navigation.navigate("gameEnigmaEndFinishScreen")
      } else {
        Alert.alert("La réponse est fausse")
      }
    },
    [props.navigation, selected, enigma],
  )

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={QUIZZ_CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <HelpQuit parentScreenNavProp={props.navigation}/>
        <View style={QUIZZ}>
          <Header headerTx="gameEnigmaQuizzScreen.header" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={QUESTION_STYLE} text={question.title}></Text>

          <SafeAreaView style={RESPONSES_CONTAINER}>
            <FlatList
              data={answers}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  title={item.title}
                  selected={!!selected.get(item.id)}
                  onSelect={onSelect}
                />
              )}
              keyExtractor={item => item.id}
              extraData={selected}
            />
            <Button
              style={SUBMIT_BUTTON}
              textStyle={SUBMIT_BUTTON_CONTENT}
              tx="gameHomeScreen.testQuizz"
              onPress={submit}
            />
          </SafeAreaView>
        </View>
        <View style={CHARACTER}>
          <Image style={CHARACTER_IMAGE} source={character}/>
        </View>
      </Screen>
    </View>
  )
})
