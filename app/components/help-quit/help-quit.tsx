import * as React from "react"
import { View, ViewStyle } from "react-native"
import { useObserver } from "mobx-react-lite"
import { HelpEnigma, QuitEnigma } from "../"
import { NavigationScreenProp } from "react-navigation"

export interface HelpQuitProps {
  parentScreenNavProp: NavigationScreenProp<{}>,
  isEnigma?: boolean,
}

const ActionView: ViewStyle = {
  position: "absolute",
  top: 15,
  right: 0,

  flexDirection: "column",
  justifyContent: "space-around",
  marginRight: -30,
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const HelpQuit: React.FunctionComponent<HelpQuitProps> = props => {
  // const { someStore } = useStores()

  return useObserver(() => (
    <View style={ActionView}>
      <QuitEnigma parentScreenNavProp={props.parentScreenNavProp} isEnigma={props.isEnigma}/>
      <HelpEnigma/>
    </View>
  ))
}
