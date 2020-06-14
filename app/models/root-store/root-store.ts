import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { ItemStoreModel } from "../item-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore")
  .props({
    itemStore: types.optional(ItemStoreModel, {}),
    navigationStore: types.optional(NavigationStoreModel, {}),
  })
  .views(self => ({}))
  .actions(self => ({
    reset() {
      self.itemStore.reset()
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
