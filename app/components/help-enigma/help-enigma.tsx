import * as React from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { useObserver } from "mobx-react-lite"
import { Button, Text } from "../"
import { helpEnigmaStyles as styles } from "./help-enigma.styles"
import { useStores } from "../../models/root-store"

export interface HelpEnigmaProps {}

const ActionText: TextStyle = {
  fontSize: 32,
}

const ButtonActionView: ViewStyle = {
  borderRadius: 20,
  width: 100,
  height: 40,

  marginBottom: 20,

  alignItems: "flex-start",
  paddingLeft: 20,
}

const ButtonActionLightView: ViewStyle = {
  backgroundColor: "#83949B",
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const HelpEnigma: React.FunctionComponent<HelpEnigmaProps> = props => {
  const enigmaStore = useStores().enigmaStore
  const enigma = enigmaStore.find(enigmaStore.currentEnigmaName)
  const help = enigma
    ? enigma.help
    : `Rechercher les indices qui vous meneront à la prochaine énigme. Il vous reste ${enigmaStore.remaining()} énigme(s) à trouver`

  const askHelp = function() {
    Alert.alert(
      "Aide",
      help,
    )
  }

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <Button style={[ButtonActionView, ButtonActionLightView]} onPress={askHelp}>
        <Text style={ActionText}>?</Text>
      </Button>
    </View>
  ))
}
