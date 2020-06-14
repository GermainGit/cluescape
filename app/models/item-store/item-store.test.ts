import { ItemStore, ItemStoreModel } from "./item-store"

test("can be created", () => {
  const instance: ItemStore = ItemStoreModel.create({})

  expect(instance).toBeTruthy()
})
