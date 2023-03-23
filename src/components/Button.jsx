import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={
              (styles.button,
              {
                backgroundColor: "#6C63FF",
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              })
            }
            onPress={onPress}
          >
            <Text style={(styles.buttonLabel, { color: "#fff", fontSize: 16 })}>
              {label}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (theme === "secondary") {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={
              (styles.button,
              {
                borderWidth: 1,
                borderColor: "#6C63FF",
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              })
            }
            onPress={onPress}
          >
            <Text
              style={(styles.buttonLabel, { color: "#6C63FF", fontSize: 16 })}
            >
              {label}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  buttonContainer: {
    width: "105%",
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#000",
    fontSize: 16,
  },
});
