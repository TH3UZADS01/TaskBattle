import { TextInput, View } from "react-native";

interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export function Input({
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  onChangeText,
  value,
}: InputProps) {
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
        backgroundColor: "#fff",
        borderRadius: 8,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
        }}
        placeholder={placeholder || "Digite algo..."}
        placeholderTextColor={placeholderTextColor || "#1c1c1c71"}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
