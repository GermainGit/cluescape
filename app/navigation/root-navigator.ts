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
  GameEnigmaColorCameraScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    gameEnigmaColorCameraScreen: { screen: GameEnigmaColorCameraScreen },
    menuMainScreen: { screen: MenuMainScreen },
    primaryStack: { screen: PrimaryNavigator },
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
