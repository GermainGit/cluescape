import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { Item, ItemModel } from "../item"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore")
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    items: types.array(ItemModel)
  })
  .views(self => ({
    get itemCount() {
      return self.items.length
    }
  }))
  .actions(self => {
    return ({
      addItem(item: Item) {
        self.items.push(item)
      }
    })
  })

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
