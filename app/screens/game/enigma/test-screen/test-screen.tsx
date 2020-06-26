import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View } from "react-native"
import { Screen, Text } from "../../../../components"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { accelerometer, setUpdateIntervalForType } from "react-native-sensors"

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 30,
    margin: 10,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueName: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 50,
  },
  valueValue: {
    fontSize: 20,
    width: 200
  },
})

export interface TestScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

function Item({ name, value }) {
  const valueStringified = String(value)
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{valueStringified.substring(0, 8)}</Text>
    </View>
  )
}

export const TestScreen: React.FunctionComponent<TestScreenProps> = observer((props) => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0, z: 0, timestamp: "" })

  setUpdateIntervalForType("accelerometer", 5)

  accelerometer.subscribe(({ x, y, z, timestamp }) => {
    setCoords({ x, y, z, timestamp })
    if (y !== 9.776309) console.log(y)
  })

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="testScreen.header" />
      <View style={styles.container}>
        <Text style={styles.headline}>
          Accelerometer values
        </Text>
        <Item name="x" value={coords.x} />
        <Item name="y" value={coords.y} />
        <Item name="z" value={coords.z} />
      </View>
    </Screen>
  )
})
