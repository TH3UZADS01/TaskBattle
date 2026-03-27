import { TextInput, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/src/context/ThemeContext";
import { lightTheme, darkTheme } from "@/src/theme/colors";

interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  fixed?: boolean;
}

export function Input({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  fixed,
}: InputProps) {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? darkTheme : lightTheme;

  const bg = fixed ? "#1573ed" : theme.card;
  const textColor = fixed ? "#ffffff" : theme.text;
  const placeholderColor = fixed ? "#ffffffac" : dark ? "#aaa" : "#666";

  return (
    <View
      style={{
        height: 40,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: bg,
        borderRadius: 8,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          color: textColor,
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
