import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/src/styles/Colors";
import Icon from "@/src/components/Icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cartoes"
        options={{
          title: "Cartões",
          tabBarIcon: ({ color }) => (
            <Icon icon={"Ionicons"} icon_name={"card-outline"} size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pagar"
        options={{
          title: "Pagar",
          tabBarIcon: ({ color }) => (
            <View style={styles.pagarIconContainer}>
              <Icon icon={"MaterialIcons"} icon_name={"qr-code-scanner"} size={28} color={Colors.white} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="compras"
        options={{
          title: "Compras",
          tabBarIcon: ({ color }) => (
            <Icon icon={"Ionicons"} icon_name={"cart-outline"} size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="outros"
        options={{
          title: "Outros",
          tabBarIcon: ({ color }) => (
            <Icon icon={"Feather"} icon_name={"more-horizontal"} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  pagarIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#01716D',
    marginBottom: 25
  },
});
