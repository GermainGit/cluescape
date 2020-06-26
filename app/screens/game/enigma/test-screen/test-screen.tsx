import * as React from "react"
import { observer } from "mobx-react-lite"
import { Alert, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../../../components"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { gyroscope, SensorTypes, setUpdateIntervalForType } from "react-native-sensors"
import { filter, map } from "rxjs/operators"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  headline: {
    fontSize: 30,
    margin: 10,
    textAlign: "center",
  },
  valueContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  valueName: {
    fontSize: 20,
    fontWeight: "bold",
    width: 50,
  },
  valueValue: {
    fontSize: 20,
    width: 200,
  },
})

export interface TestScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

function Item({ name, value }) {
  const valueNumberized = Number(value)
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{Math.round(valueNumberized)}</Text>
    </View>
  )
}

export const TestScreen: React.FunctionComponent<TestScreenProps> = observer((props) => {
  const [coords, setCoords] = React.useState({ rotate: 0, value: 0, next: 1 })
  const series = [
    {
      value: 4,
      done: false,
    },
    {
      value: -1,
      done: false,
    },
    {
      value: 2,
      done: false,
    },
    {
      value: -3,
      done: false,
    },
  ]
  let next = 0
  let started = false
  let subscription = null

  setUpdateIntervalForType(SensorTypes.accelerometer, 600)// defaults to 100ms

  const nextSeriesValue = function() {
    if (next < series.length) {
      const sequence = series[next]
      console.log({ sequence: sequence, boolean: !sequence.done && next < series.length })
      if (!sequence.done) {
        return sequence.value
      }
    }

    return null
  }

  const validateSeries = function(rotate) {
    const value = nextSeriesValue()
    if (value === null) {
      subscription.unsubscribe()
      Alert.alert('Finish', 'Terminé')
    }

    const validate = value > 0 ? rotate >= value : rotate <= value
    if (validate) {
      series[next].done = true
      next++
    }
    console.log({ rotate: rotate, next: next, validate: validate, value: nextSeriesValue() })
    return { rotate: rotate, value: nextSeriesValue(), next: next, validate: validate }
  }

  const manageSensor = function() {
    if (!started) {
      subscription = gyroscope
        .pipe(
          map(({ z }) => validateSeries(z)),
          filter(sequence => sequence.validate === true),
        )
        .subscribe(
          sequence => {
            setCoords({ rotate: sequence.rotate, value: sequence.value, next: sequence.next })
          },
        )
    } else {
      subscription.unsubscribe()
    }
    started = !started
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <TouchableWithoutFeedback onPress={manageSensor}>
        <View style={styles.container}>
          <Text preset="header" tx="testScreen.header"/>
          <Text style={styles.headline}>
            Gyroscope values
          </Text>
          {/* <Item name="rot" value={coords.rotate}/> */}
          <Item name="next" value={coords.value}/>
          <Item name="num" value={coords.next}/>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  )
})
