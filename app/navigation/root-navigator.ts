import { createStackNavigator } from "react-navigation-stack"
import { PrimaryNavigator } from "./primary-navigator"

// prettier-ignore
import {
  MenuMainScreen,
  MenuSettingsSettingsScreen,
  MenuSettingsCguScreen,
  MenuSettingsNoticeScreen,
  MenuAccountAccountScreen,
  MenuAccountSignInScreen,
  MenuAccountSignUpScreen,
  GameHomeScreen,
  GameEnigmaQuizzScreen,
  GameEndAssemblyScreen,
  GameEndFinalScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    gameEndFinalScreen: { screen: GameEndFinalScreen },
    gameEndAssemblyScreen: { screen: GameEndAssemblyScreen },
    gameEnigmaQuizzScreen: { screen: GameEnigmaQuizzScreen },
    gameHomeScreen: { screen: GameHomeScreen },
    menuAccountSignUpScreen: { screen: MenuAccountSignUpScreen },
    menuAccountSignInScreen: { screen: MenuAccountSignInScreen },
    menuAccountAccountScreen: { screen: MenuAccountAccountScreen },
    menuSettingsNoticeScreen: { screen: MenuSettingsNoticeScreen },
    menuSettingsCguScreen: { screen: MenuSettingsCguScreen },
    menuSettingsSettingsScreen: { screen: MenuSettingsSettingsScreen },
    menuMainScreen: { screen: MenuMainScreen },
    primaryStack: { screen: PrimaryNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
