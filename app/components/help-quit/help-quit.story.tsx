import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { HelpQuit } from "./help-quit"

declare var module

storiesOf("HelpQuit", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <HelpQuit text="HelpQuit" />
      </UseCase>
    </Story>
  ))
