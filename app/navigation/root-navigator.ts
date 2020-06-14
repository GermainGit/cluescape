import { createStackNavigator } from "react-navigation-stack"
import { PrimaryNavigator } from "./primary-navigator"
// prettier-ignore
import {
  GameEndAssemblyScreen,
  GameEnigmaEndFinishScreen,
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

export const RootNavigator = createStackNavigator(
  {
    primaryStack: { screen: PrimaryNavigator },
    gameEnigmaEndFinishScreen: { screen: GameEnigmaEndFinishScreen },
    menuMainScreen: { screen: MenuMainScreen },
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
