import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { IconMap } from "../interfaces/icons";

type Props = {
  icon: keyof typeof IconMap;
  icon_name: any;
  size: number;
  color: string;
};

const FallbackIcon = ({ size, color }: { size: number; color: string }) => (
  <EvilIcons name="exclamation" size={size} color={color} />
);

export default function Icon({ icon, icon_name, size, color }: Props) {
  const IconComponent = IconMap[icon];

  if (!IconComponent) {
    return <FallbackIcon size={size} color={color} />;
  }

  return <IconComponent name={icon_name} size={size} color={color} />;
}
