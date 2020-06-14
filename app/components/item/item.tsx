import * as React from "react"
import { Image, View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { itemStyles as styles } from "./item.styles"
import { ItemType } from "../../models/item-store"

export interface ItemProps {
  item: ItemType
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const Item: React.FunctionComponent<ItemProps> = props => {
  const image = `~/app/assets/images/${props.item.img}`
  return useObserver(() => (
    <View style={styles.WRAPPER}>
      {props.item.owned ? <Image style={styles.IMAGE} source={}/> : ""}
    </View>
  ))
}
