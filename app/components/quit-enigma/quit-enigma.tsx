import * as React from "react"
import { View, Modal, Image, ViewStyle, ImageStyle, TextStyle, Text } from "react-native"
import { useObserver } from "mobx-react-lite"
import { quitEnigmaStyles as styles } from "./quit-enigma.styles"
import { NavigationScreenProp } from "react-navigation"
import { Button } from ".."

const ActionView: ViewStyle = {
  position: "absolute",
  top: 15,
  right: 0,

  flexDirection: "column",
  justifyContent: "space-around",
  marginRight: -30,
}

const ModalButtonView: ViewStyle = {
  marginTop: 20,
  width: 200,
  flexDirection: "row",
  justifyContent: "space-between",
}

const ButtonActionView: ViewStyle = {
  borderRadius: 20,
  width: 100,
  height: 40,

  marginBottom: 20,

  alignItems: "flex-start",
  paddingLeft: 20,
}

const ActionImage: ImageStyle = {
  height: 24,
  width: 24,
}

const ModalContainerView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const ButtonActionDarkView: ViewStyle = {
  backgroundColor: "#1F2F33",
}

const ModalView: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 345,
  height: 148,
  alignSelf: "center",
  backgroundColor: "#83949B",
  borderRadius: 10,
}

const ModalButtonStyle: ViewStyle = {
  borderRadius: 20,
  width: 92,
  height: 42,
}

const ModalTitleText: TextStyle = {
  fontSize: 24,
}

const ModalButtonBorder: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: "#F7F8E9",
}

const ModalButtonText: TextStyle = {
  fontSize: 19,
}

const ModalButtonFull: ViewStyle = {
  backgroundColor: "#F7F8E9",
  borderWidth: 1,
  borderColor: "#F7F8E9",
}

const ModalButtonFullText: TextStyle = {
  color: "#83949B",
}

export interface QuitEnigmaProps {
  parentScreenNavProp: NavigationScreenProp<{}>;
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const QuitEnigma: React.FunctionComponent<QuitEnigmaProps> = props => {
  const leave = React.useMemo(() => () =>
    props.parentScreenNavProp.navigate("gameHomeScreen"), [
    props.parentScreenNavProp,
  ])

  const [modalVisible, setModalVisible] = React.useState(false)

  const closeGame = function() {
    setModalVisible(true)
  }

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <View style={ActionView}>
        <Button style={[ButtonActionView, ButtonActionDarkView]} onPress={closeGame}>
          <Image style={ActionImage} source={require("./cross.png")}/>
        </Button>
      </View>

      <Modal
        animationType={"fade"}
        visible={modalVisible}
        transparent={true}
      >
        <View style={ModalContainerView}>
          <View style={ModalView}>
            <Text style={ModalTitleText}>Quitter l'enigme ?</Text>
            <View style={ModalButtonView}>
              <Button
                style={[ModalButtonStyle, ModalButtonBorder]}
                textStyle={ModalButtonText}
                onPress={() => {
                  setModalVisible(false)
                  leave()
                }}
                text={"Oui"}
              />
              <Button
                style={[ModalButtonStyle, ModalButtonFull]}
                textStyle={[ModalButtonText, ModalButtonFullText]}
                onPress={() => setModalVisible(false)}
                text={"Non"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ))
}
