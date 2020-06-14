import { Instance, types } from "mobx-state-tree"

const ItemModel = types.model("ItemType")
  .props({
    id: types.integer,
    name: types.string,
    img: types.string,
    owned: types.boolean,
  })

export type ItemType = Instance<typeof ItemModel>

/**
 * Model description here for TypeScript hints.
 */
export const ItemStoreModel = types
  .model("ItemStore")
  .props({
    items: types.array(ItemModel),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addItem(item: ItemType) {
      self.items.push(item)
    },
    clear() {
      self.items.clear()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ItemStoreType = Instance<typeof ItemStoreModel>

export interface ItemStore extends ItemStoreType {
}
