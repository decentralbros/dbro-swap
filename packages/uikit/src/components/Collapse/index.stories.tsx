// Collapse.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Collapse } from ".";
import { Box } from "../Box";

// Meta
const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  argTypes: {
    title: { control: "text" },
    content: { control: "text" },
    isOpen: { control: "boolean" },
    onToggle: { action: "toggled" },
  },
  args: {
    title: "Collapse Title",
    content: "This is the content of the collapse component.",
    isOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// Demo
export const Default = (args: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Collapse
      {...args}
      isOpen={isOpen}
      onToggle={handleToggle}
      title={<Box padding="16px">{args.title}</Box>}
      content={<Box padding="16px">{args.content}</Box>}
    />
  );
};

// Open demo
export const Opened: Story = {
  args: {
    title: "Opened Collapse",
    content: "This collapse is open by default.",
    isOpen: true,
  },
};

// different title and content
export const CustomContent: Story = {
  args: {
    title: "Custom Title",
    content: "This is custom content for the collapse component.",
  },
};
