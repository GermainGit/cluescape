import * as React from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { useStores } from "../../models/root-store"
import { inventoryStyles as styles } from "./inventory.styles"
import { ItemType } from "../../models/item-store"
import { Item } from ".."

export interface InventoryProps {
  visible: (value: boolean) => {}
}

const items: ItemType[] = [
  { name: "bolt", img: "images/screw.png", owned: true },
  { name: "bolt", img: "images/screw.png", owned: false },
  { name: "bolt", img: "images/screw.png", owned: false },
  { name: "bolt", img: "images/screw.png", owned: false },
]

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const Inventory: React.FunctionComponent<InventoryProps> = props => {
  const itemStore = useStores().itemStore
  itemStore.clear()

  for (const item of items) {
    itemStore.addItem(item)
  }

  console.log(itemStore.items.length)

  const hide = () => {
    props.visible(false)
  }

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <TouchableWithoutFeedback onPress={hide}>
        <View style={styles.WRAPPER}>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.MODAL}>
        {itemStore.items.map((item) => (
          <Item item={item}></Item>
        ))}
      </View>
    </View>

  ))
}
