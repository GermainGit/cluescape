import { Instance, SnapshotOut, types } from "mobx-state-tree"

const enigmas: EnigmaType[] = [
  {
    name: "Quizz",
    help: "Find the righ answer to discorver out what they're up to",
    code: "cluenigma1",
    item: 1,
    screen: "gameEnigmaQuizzScreen",
    isFinish: false,
  },
  {
    name: "HiddenText",
    help: "Find the secret document and read it's content",
    code: "cluenigma2",
    item: 2,
    screen: "gameEnigmaQuizzScreen",
    isFinish: false,
  },
  {
    name: "RightMoves",
    help: "Be as discreet as possible so as not to be spotted.",
    code: "cluenigma3",
    item: 3,
    screen: "gameEnigmaQuizzScreen",
    isFinish: false,
  },
  {
    name: "End",
    help: "Il ne faut pas relacher l'effort. Pas si proche du but... Il faut désormais raccorder les morceaux pour comprendre ce qu'il se trame...",
    code: "cluefinal",
    item: 0,
    screen: "",
    isFinish: true,
  },
]

const EnigmaModel = types.model("EnigmaType")
  .props({
    name: types.string,
    help: types.string,
    item: types.number,
    code: types.string,
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
    set(enigmas: EnigmaType[]) {
      for (const enigma of enigmas) {
        self.enigmas.push(enigma)
      }
    },

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

    remaining: function() {
      return self.enigmas.filter(enigma => !enigma.isFinish).length
    },

    next(): EnigmaType {
      if (!this.remaining()) {
        return this.enigmaEnd()
      }

      const next = self.enigmas.filter(enigma => !enigma.isFinish)[Math.floor(Math.random() * this.remaining())]
      self.currentEnigmaName = next.name

      return next
    },

    get(code: string): EnigmaType|null {
      if (!this.remaining()) {
        return null
      }

      const enigma = enigmas.filter(enigma => enigma.code.toLowerCase() === code.toLowerCase())[0]
      self.currentEnigmaName = enigma.name

      return enigma
    },

    findByName(name: string): EnigmaType {
      return enigmas.filter(enigma => enigma.name.toLowerCase() === name.toLowerCase())[0]
    },

    finish(enigma: EnigmaType) {
      const index = self.enigmas.findIndex((enigmaS) => enigmaS.name === enigma.name)
      self.enigmas[index].isFinish = true
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
