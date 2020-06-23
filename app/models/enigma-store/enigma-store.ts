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
  {
    name: "End",
    help: "Il ne faut pas relacher l'effort. Pas si proche du but... Il faut désormais raccorder les morceaux pour comprendre ce qu'il se trame...",
    item: 0,
    screen: "gameEndAssemblyScreen",
    isFinish: true,
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
    isEnigmaEnd() {
      return self.name.toLowerCase() === 'end'
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

    enigmaEnd() {
      const lastEnigma = self.enigmas[self.enigmas.length - 1]
      self.currentEnigmaName = lastEnigma.name

      return lastEnigma
    },

    finish(enigma: EnigmaType) {
      const index = self.enigmas.findIndex((enigmaS) => enigmaS.name === enigma.name)
      self.enigmas[index].isFinish = true
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
      if (!this.remaining()) {
        return this.enigmaEnd()
      }

      const next = self.enigmas.filter(enigma => !enigma.isFinish)[Math.floor(Math.random() * this.remaining())]
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
