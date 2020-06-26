import { Instance, types } from "mobx-state-tree"

const items: ItemType[] = [
  { id: 1, name: "monitor" },
  { id: 2, name: "usb" },
  { id: 3, name: "controller" },
]

export const ItemModel = types.model("ItemType")
  .props({
    id: types.number,
    name: types.string,
    owned: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setOwned() {
      self.owned = true
    },
  }))

export type ItemType = Instance<typeof ItemModel>

/**
 * Model description here for TypeScript hints.
 */
export const ItemStoreModel = types
  .model("ItemStore")
  .props({
    items: types.array(ItemModel),
    currentId: types.optional(types.number, 0),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    reset() {
      self.items.clear()
      this.init()
    },

    init() {
      if (self.items.length === 0) {
        for (const item of items) {
          self.items.push(item)
        }
      }
    },

    setReward(id: number) {
      self.currentId = id
    },

    getReward() {
      return self.items.find(item => item.id === self.currentId)
    },

    clear() {
      self.items.clear()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ItemStoreType = Instance<typeof ItemStoreModel>

export interface ItemStore extends ItemStoreType {
}
