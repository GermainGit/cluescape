import * as React from "react"
import { View, ViewStyle } from "react-native"
import { useObserver } from "mobx-react-lite"
import { HelpEnigma, QuitEnigma } from "../"
import { NavigationScreenProp } from "react-navigation"

const ActionView: ViewStyle = {
  position: "absolute",
  top: 15,
  right: 0,

  flexDirection: "column",
  justifyContent: "space-around",
  marginRight: -30,
}

export interface HelpQuitProps {
  parentScreenNavProp: NavigationScreenProp<{}>,
  isEnigma?: boolean,
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const HelpQuit: React.FunctionComponent<HelpQuitProps> = props => {
  let isEnigma = props.isEnigma
  if (undefined === isEnigma) {
    isEnigma = true
  }

  return useObserver(() => (
    <View style={ActionView}>
      <QuitEnigma parentScreenNavProp={props.parentScreenNavProp} isEnigma={isEnigma}/>
      <HelpEnigma isEnigma={isEnigma}/>
    </View>
  ))
}
