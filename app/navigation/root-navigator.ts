import { createStackNavigator } from "react-navigation-stack"
// prettier-ignore
import {
  GameEndAssemblyScreen,
  GameEndFinalScreen,
  GameEnigmaQuizzScreen,
  GameHomeScreen,
  MenuAccountAccountScreen,
  MenuAccountSignInScreen,
  MenuAccountSignUpScreen,
  MenuMainScreen,
  MenuSettingsCguScreen,
  MenuSettingsNoticeScreen,
  MenuSettingsSettingsScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars
// import { PrimaryNavigator } from "./primary-navigator"

export const RootNavigator = createStackNavigator(
  {
    menuMainScreen: { screen: MenuMainScreen },
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
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
