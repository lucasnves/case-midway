import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { IconMap } from "../interfaces/icons";
import { RelativePathString, useRouter } from "expo-router";
import { Colors } from "../styles/Colors";
import Styles from "../styles/Styles";

type Props = {
  icon: keyof typeof IconMap;
  icon_name: string;
  title: string;
  page: RelativePathString;
};

export default function CardService({ icon, icon_name, title, page }: Props) {
  const router = useRouter();
  const isDisabled = page === "..";

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[Styles.CardShadow, styles.container, { opacity: isDisabled ? 0.6 : 1 }]}
      onPress={() => {
        if (!isDisabled) router.push(page);
      }}
    >
      <Icon
        icon={icon}
        icon_name={icon_name}
        size={25}
        color={Colors.primary}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 10,
    borderRadius: 14,
    height: 90,
  },
  title: {
    fontSize: 14,
  },
});
