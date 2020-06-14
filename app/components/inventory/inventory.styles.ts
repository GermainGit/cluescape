import { ViewStyle } from "react-native"

export const inventoryStyles = {
  WRAPPER: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 1,

    display: "flex",
  } as ViewStyle,
  MODAL: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 150,

    borderRadius: 50,

    zIndex: 2,

    backgroundColor: "#1F2F33",
    justifySelf: "center",
    alignSelf: "center",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flexWrap: "wrap",

    padding: 20,
    paddingTop: 10,
  } as ViewStyle,
}
