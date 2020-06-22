import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { HelpEnigma } from "./help-enigma"

declare var module

storiesOf("HelpEnigma", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <HelpEnigma text="HelpEnigma" />
      </UseCase>
    </Story>
  ))
