import { EnigmaStore, EnigmaStoreModel } from "./enigma-store"

test("can be created", () => {
  const instance: EnigmaStore = EnigmaStoreModel.create({})

  expect(instance).toBeTruthy()
})
