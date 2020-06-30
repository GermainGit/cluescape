import * as React from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  Animated,
  Easing,
  ImageStyle,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { HelpQuit, Screen, Text, Wallpaper } from "../../../../components"
import { color } from "../../../../theme"
import { NavigationScreenProp } from "react-navigation"
import { magnetometer } from "react-native-sensors"
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
    top: 150,
  },
})

export interface TestScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const ImageLocker: ImageStyle = {
  height: 350,
  width: 350,
}

function Item({ name, value }) {
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{value}</Text>
    </View>
  )
}

export const SafeboxScreen: React.FunctionComponent<TestScreenProps> = observer((props) => {
  const store = useStores()
  const enigma = store.enigmaStore.find(store.enigmaStore.currentEnigmaName)
  store.itemStore.setReward(enigma.item)

  let calibration = 0
  const rotateRatio = (360 / 160)
  const spinLocker = new Animated.Value(0)
  const spin = spinLocker.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  })

  const spinAnimation = function(rotation) {
    const rotate = (rotation - calibration) * rotateRatio
    console.log(rotation)
    Animated.timing(
      spinLocker,
      {
        toValue: rotate,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ).start()
  }

  const calibrate = function(firstValue) {
    if (calibration === 0 && calibration !== firstValue) {
      calibration = firstValue
    }
  }

  const series = [
    {
      value: 30,
      done: false,
    },
    {
      value: -10,
      done: false,
    },
    {
      value: 15,
      done: false,
    },
    {
      value: -25,
      done: false,
    },
  ]
  const [nextSequenceValue, setNextSequenceValue] = React.useState("0")
  const [started, setStarted] = React.useState(false)
  // const [subscription, setSubscription] = React.useState(null)

  let next = 0
  let subscription = null

  // setUpdateIntervalForType(SensorTypes.magnetometer, 600)// defaults to 100ms

  const nextSeriesValue = function() {
    if (next < series.length) {
      const sequence = series[next]
      if (!sequence.done) {
        return sequence.value
      }
    }

    return null
  }

  const finish = function() {
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

  const validateSeries = function(rotate) {
    const value = nextSeriesValue()

    spinAnimation(rotate)

    if (value === null) {
      finish()
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
      setNextSequenceValue(series[0].value.toString())
      subscription = magnetometer
        .pipe(
          map(({ x }) => { calibrate(x); return validateSeries(Math.round(x)) }),
          filter(sequence => sequence.validate === true),
        )
        .subscribe(
          sequence => {
            if (sequence.value === null) {
              setNextSequenceValue("")
            } else {
              setNextSequenceValue(sequence.value.toString())
            }
          },
        )
    } else {
      subscription.unsubscribe()
      next = 0
      setNextSequenceValue("0")
    }
    setStarted(!started)
  }

  // TODO: add callback for on quit to add custom reset (unsuscribe)

  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper backgroundImage={require("./safebox.jpg")}/>
      <HelpQuit parentScreenNavProp={props.navigation}/>

      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.headline}>
            Open the safe box !
          </Text>
          <Item name="next" value={nextSequenceValue}/>
          <TouchableWithoutFeedback onPress={manageSensor}>
            <Animated.Image style={[ImageLocker, { transform: [{ rotate: spin }] }]}
              source={require("./safebox-locker.png")}/>
          </TouchableWithoutFeedback>
        </View>
      </View>

    </Screen>
  )
})
