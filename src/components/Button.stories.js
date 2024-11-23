// src/components/Button.stories.js
import Button from "./Button";

export default {
  title: "Components/Button", // Title in Storybook UI
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Click Me",
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "Disabled",
  onClick: () => {},
};
