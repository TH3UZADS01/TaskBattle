import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "@/src/context/ThemeContext";
import { lightTheme, darkTheme } from "@/src/theme/colors";

export default function TabsLayout() {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1573ed",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },

        tabBarActiveTintColor: dark ? "#1573ed" : "#1573ed",
        tabBarInactiveTintColor: dark ? "#ffffff" : "#1d1d1d",
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: dark ? "#333" : "#ccc",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tarefas"
        options={{
          title: "Tarefas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: "Config",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
