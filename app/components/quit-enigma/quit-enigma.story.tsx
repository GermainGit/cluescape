import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { QuitEnigma } from "./quit-enigma"

declare var module

storiesOf("QuitEnigma", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <QuitEnigma text="QuitEnigma" />
      </UseCase>
    </Story>
  ))
