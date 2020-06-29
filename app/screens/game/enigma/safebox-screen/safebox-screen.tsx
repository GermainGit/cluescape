import * as React from "react"
import { observer } from "mobx-react-lite"
import { Alert, StyleSheet, View, ViewStyle } from "react-native"
import { Button, HelpQuit, Screen, Text } from "../../../../components"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { magnetometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors"
import { filter, map } from "rxjs/operators"
import { useStores } from "../../../../models/root-store"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  wrapper: {
    top: 150
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

export const SafeboxScreen: React.FunctionComponent<TestScreenProps> = observer((props) => {
  const store = useStores()
  const enigma = store.enigmaStore.find(store.enigmaStore.currentEnigmaName)
  store.itemStore.setReward(enigma.item)

  const series = [
    {
      value: 40,
      done: false,
    },
    {
      value: -10,
      done: false,
    },
    {
      value: 20,
      done: false,
    },
    {
      value: -30,
      done: false,
    },
  ]
  const [nextSequenceValue, setNextSequenceValue] = React.useState(0)
  let next = 0
  let started = false
  let subscription = null

  setUpdateIntervalForType(SensorTypes.accelerometer, 600)// defaults to 100ms

  const nextSeriesValue = function() {
    if (next < series.length) {
      const sequence = series[next]
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
      Alert.alert(
        "Finish",
        "Coffre ouvert",
        [
          {
            text: "OK",
            onPress: function() {
              store.enigmaStore.finish(enigma)
              props.navigation.navigate("gameEnigmaEndFinishScreen")
            },
          },
        ])
    }

    const validate = value > 0 ? rotate === value : rotate === value
    if (validate) {
      series[next].done = true
      next++
    }

    // console.log({ rotate: rotate, next: next, validate: validate, value: nextSeriesValue() })
    return { value: nextSeriesValue(), next: next, validate: validate }
  }

  const manageSensor = function() {
    if (!started) {
      setNextSequenceValue(series[0].value)
      subscription = magnetometer
        .pipe(
          map(({ x }) => validateSeries(Math.round(x))),
          filter(sequence => sequence.validate === true),
        )
        .subscribe(
          sequence => {
            setNextSequenceValue(sequence.value)
          },
        )
    } else {
      subscription.unsubscribe()
      next = 0
      setNextSequenceValue(0)
    }
    started = !started
  }

  // TODO: add callback for on quit to add custom reset (unsuscribe)

  return (
    <Screen style={ROOT} preset="fixed">
      <HelpQuit parentScreenNavProp={props.navigation}/>

      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.headline}>
            Open the safe box !
          </Text>
          <Item name="next" value={nextSequenceValue}/>
          <Button onPress={manageSensor} text={"Start/Stop"}></Button>
        </View>
      </View>

    </Screen>
  )
})
