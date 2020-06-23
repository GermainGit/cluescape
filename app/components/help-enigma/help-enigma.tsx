import * as React from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { useObserver } from "mobx-react-lite"
import { Button, Text } from "../"
import { helpEnigmaStyles as styles } from "./help-enigma.styles"
import { useStores } from "../../models/root-store"

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

export interface HelpEnigmaProps {
  isEnigma: boolean
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const HelpEnigma: React.FunctionComponent<HelpEnigmaProps> = props => {
  const enigmaStore = useStores().enigmaStore

  const askHelp = function() {
    const remaining = enigmaStore.remaining()
    const enigma = remaining
      ? enigmaStore.find(enigmaStore.currentEnigmaName)
      : enigmaStore.enigmaEnd()

    const help = (props.isEnigma && enigma) || !remaining
      ? enigma.help
      : `Rechercher les indices qui vous meneront à la prochaine énigme. Il vous reste ${enigmaStore.remaining()} énigme(s) à trouver`

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
