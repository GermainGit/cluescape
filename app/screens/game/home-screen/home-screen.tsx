import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ImageStyle, Modal, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { Button, Inventory, Screen, Text } from "../../../components"
import { color } from "../../../theme"
import { NavigationScreenProp } from "react-navigation"

export interface GameHomeScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ActionView: ViewStyle = {
  position: "absolute",
  top: 15,
  right: 0,

  flexDirection: "column",
  justifyContent: "space-around",
  marginRight: -30,
}

const ButtonActionView: ViewStyle = {
  borderRadius: 20,
  width: 100,
  height: 40,

  marginBottom: 20,

  alignItems: "flex-start",
  paddingLeft: 20,
}

const ButtonActionDarkView: ViewStyle = {
  backgroundColor: "#1F2F33",
}

const ButtonActionLightView: ViewStyle = {
  backgroundColor: "#83949B",
}

const ActionImage: ImageStyle = {
  height: 24,
  width: 24,
}

const ActionText: TextStyle = {
  fontSize: 32,
}

const ScannerImageView: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const ScannerImage: ImageStyle = {
  resizeMode: "contain",
  height: 250,
  width: 250,
}

const ScannerMiddleView: ViewStyle = {
  position: "absolute",
  borderRadius: 50,
  height: 24,
  width: 24,

  borderWidth: 4,
  borderColor: "rgba(247, 248, 233, 0.68)",

  backgroundColor: "#F7F8E9",
}

const InventoryView: ViewStyle = {
  position: "absolute",
  bottom: 50,
  alignSelf: "center",
  borderRadius: 50,
  height: 80,
  width: 80,

  backgroundColor: "#1F2F33",
}

const ModalContainerView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
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

const ModalButtonView: ViewStyle = {
  marginTop: 20,
  width: 200,
  flexDirection: "row",
  justifyContent: "space-between",
}

const ModalTitleText: TextStyle = {
  fontSize: 24,
}

const ModalButtonStyle: ViewStyle = {
  borderRadius: 20,
  width: 92,
  height: 42,
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

const ModalButtonBorder: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: "#F7F8E9",
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const GameHomeScreen: React.FunctionComponent<GameHomeScreenProps> = observer((props) => {
  const leave = React.useMemo(() => () =>
    props.navigation.navigate("menuMainScreen"), [
    props.navigation,
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [inventoryVisible, setInventoryVisible] = useState(false)

  const openInventory = function() {
    setInventoryVisible(true)
  }

  const closeGame = function() {
    setModalVisible(true)
  }

  const askHelp = function() {
    Alert.alert("Ask help")
  }

  const scan = function() {
    Alert.alert("Scan")
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Modal
        animationType={"fade"}
        visible={modalVisible}
        transparent={true}
      >
        <View style={ModalContainerView}>
          <View style={ModalView}>
            <Text style={ModalTitleText}>Quitter la partie</Text>
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
      <Modal
        animationType={"fade"}
        visible={inventoryVisible}
        transparent={true}
      >
        <View style={ModalContainerView}>
          <Inventory visible={setInventoryVisible}/>
        </View>
      </Modal>
      <View style={ActionView}>
        <Button style={[ButtonActionView, ButtonActionDarkView]} onPress={closeGame}>
          <Image style={ActionImage} source={require("./cross.png")}/>
        </Button>
        <Button style={[ButtonActionView, ButtonActionLightView]} onPress={askHelp}>
          <Text style={ActionText}>?</Text>
        </Button>
      </View>

      <TouchableWithoutFeedback onPress={scan}>
        <View style={ScannerImageView}>
          <Image style={ScannerImage} source={require("./scanner.png")}/>
          <View style={ScannerMiddleView}/>
        </View>
      </TouchableWithoutFeedback>
      <Button style={InventoryView} onPress={openInventory}>
        <Image source={require("cluescape/app/assets/images/inventory.png")}/>
      </Button>
    </Screen>
  )
})
