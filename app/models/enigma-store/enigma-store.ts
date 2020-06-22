import { Instance, SnapshotOut, types } from "mobx-state-tree"

const enigmas: EnigmaType[] = [
  {
    name: "Quizz",
    help: "Find the righ answer to discorver out what they're up to",
    item: 1,
    screen: "gameEnigmaQuizzScreen",
    order: 1,
  },
  {
    name: "HiddenText",
    help: "Find the secret document and read it's content",
    item: 2,
    screen: "gameEnigmaQuizzScreen",
    order: 2,
  },
  {
    name: "RightMoves",
    help: "Be as discreet as possible so as not to be spotted.",
    item: 3,
    screen: "gameEnigmaQuizzScreen",
    order: 3,
  },
]

const EnigmaModel = types.model("EnigmaType")
  .props({
    name: types.string,
    help: types.string,
    item: types.number,
    screen: types.string,
    order: types.integer,
  })
  .actions(self => ({}))

export type EnigmaType = Instance<typeof EnigmaModel>

/**
 * Model description here for TypeScript hints.
 */
export const EnigmaStoreModel = types
  .model("EnigmaStore")
  .props({
    enigmas: types.array(EnigmaModel),
    current: types.optional(types.string, ""),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    reset() {
      self.enigmas.clear()
      this.set(enigmas)
    },

    set(enigmas: EnigmaType[]) {
      for (const enigma of enigmas) {
        self.enigmas.push(enigma)
      }
    },

    next() {
      let next
      if (!self.current) {
        next = self.enigmas.filter(enigma => enigma.order === 1)
      } else {
        next = self.enigmas.filter(function(enigma) {
          return enigma.order === (this.find(enigma.name).order + 1)
        })
      }

      self.current = next.name

      return next
    },

    current(name = null) {
      return (self.current === name ? this.find(self.current) : null)
    },

    find(name: string) {
      return enigmas.filter(enigma => enigma.name.toLowerCase() === name.toLowerCase())
    },
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type EnigmaStoreType = Instance<typeof EnigmaStoreModel>

export interface EnigmaStore extends EnigmaStoreType {
}

type EnigmaStoreSnapshotType = SnapshotOut<typeof EnigmaStoreModel>

export interface EnigmaStoreSnapshot extends EnigmaStoreSnapshotType {
}
