import * as React from "react"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { itemStyles, itemStyles as styles } from "./item.styles"
import { ItemType } from "../../models/item-store"
import { Icon } from ".."

export interface ItemProps {
  item: ItemType
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const Item: React.FunctionComponent<ItemProps> = props => {
  return useObserver(() => (
    <View style={styles.WRAPPER}>
      {props.item.owned ? <Icon style={itemStyles.IMAGE} icon={props.item.name}/> : null}
    </View>
  ))
}
