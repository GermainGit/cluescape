import { Instance, SnapshotOut, types } from "mobx-state-tree"

const enigmas: EnigmaType[] = [
  {
    name: "Quizz",
    help: "Find the righ answer to discorver out what they're up to",
    item: 1,
    screen: "gameEnigmaQuizzScreen",
  },
  {
    name: "HiddenText",
    help: "Find the secret document and read it's content",
    item: 2,
    screen: "gameEnigmaQuizzScreen",
  },
  {
    name: "RightMoves",
    help: "Be as discreet as possible so as not to be spotted.",
    item: 3,
    screen: "gameEnigmaQuizzScreen",
  },
]

const EnigmaModel = types.model("EnigmaType")
  .props({
    name: types.string,
    help: types.string,
    item: types.number,
    screen: types.string,
    isFinish: types.optional(types.boolean, false),
  })
  .actions(self => ({
    finish() {
      self.isFinish = true
    },
  }))

export type EnigmaType = Instance<typeof EnigmaModel>

/**
 * Model description here for TypeScript hints.
 */
export const EnigmaStoreModel = types
  .model("EnigmaStore")
  .props({
    enigmas: types.array(EnigmaModel),
    currentEnigmaName: types.optional(types.string, ""),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    reset() {
      self.enigmas.clear()
      this.set(enigmas)
      self.currentEnigmaName = ""
    },

    remaining: function() {
      return self.enigmas.filter(enigma => !enigma.isFinish).length
    },

    set(enigmas: EnigmaType[]) {
      for (const enigma of enigmas) {
        self.enigmas.push(enigma)
      }
    },

    next(): EnigmaType {
      const next = self.enigmas[Math.floor(Math.random() * self.enigmas.length)]

      if (next.isFinish) {
        return this.next()
      }

      self.currentEnigmaName = next.name
      return next
    },

    find(name: string): EnigmaType {
      return enigmas.filter(enigma => enigma.name.toLowerCase() === name.toLowerCase())[0]
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
