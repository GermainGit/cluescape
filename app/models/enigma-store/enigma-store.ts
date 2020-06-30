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
    name: "Safebox",
    help: "Find the code to open the safebox.",
    code: "cluenigma3",
    item: 3,
    screen: "safeBoxScreen",
    isFinish: false,
  },
  {
    name: "End",
    help: "Il ne faut pas relacher l'effort. Pas si proche du but... Il faut désormais raccorder les morceaux pour comprendre ce qu'il se trame...",
    code: "cluefinal",
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
      if (lastEnigma) {
        self.currentEnigmaName = lastEnigma.name

        return lastEnigma
      }

      return null
    },

    remaining: function() {
      return self.enigmas.filter(enigma => !enigma.isFinish).length
    },

    next(): EnigmaType {
      if (!this.remaining()) {
        return this.enigmaEnd()
      }

      const next = self.enigmas.filter(enigma => !enigma.isFinish)[Math.floor(Math.random() * this.remaining())]
      if (next) {
        self.currentEnigmaName = next.name

        return next
      }

      return null
    },

    get(code: string): EnigmaType|null {
      if (!this.remaining()) {
        const enigma = this.enigmaEnd()
        return enigma.code === code ? enigma : null
      }

      const enigma = self.enigmas.filter(enigma => enigma.code.toLowerCase() === code.toLowerCase())[0]
      if (enigma) {
        self.currentEnigmaName = enigma.name

        return enigma
      }

      return null
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
