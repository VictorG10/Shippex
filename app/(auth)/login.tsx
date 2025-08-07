import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "../../config/firebase";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = url.trim() && email.trim() && password.trim();

  // const handleLogin = async () => {
  //   setLoading(true);

  //   try {
  //     await signInWithEmailAndPassword(auth, email.trim(), password.trim());

  //     router.replace("/(tabs)" as const);
  //   } catch (error: any) {
  //     alert("Login failed. Please check your credentials.");
  //     console.error("Login error:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegisterAndLogin = async (email: string, password: string) => {
    setLoading(true); // Start loader

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      console.log("✅ User created and logged in:", userCredential.user.email);
      router.replace("/(tabs)" as const);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password.trim()
          );

          console.log("✅ Existing user logged in:", userCredential.user.email);
          router.replace("/(tabs)" as const);
        } catch (loginError: any) {
          console.error("❌ Login failed:", loginError.message);
          Alert.alert("Login failed. Please check your credentials.");
        }
      } else {
        console.error(
          "❌ Registration/Login failed:",
          error.code,
          error.message
        );
        Alert.alert("Error: " + error.message);
      }
    } finally {
      setLoading(false); //  Stop loader
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View>
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => router.push("/")}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#0057FF" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Please enter your First, Last name and your phone number in order to
          register
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="URL"
            placeholderTextColor="#999"
            value={url}
            onChangeText={setUrl}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isValid ? "#0057FF" : "#eee" },
        ]}
        disabled={!isValid || loading}
        onPress={() => handleRegisterAndLogin(email, password)}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size={"small"} />
        ) : (
          <Text
            style={[styles.buttonText, { color: isValid ? "#fff" : "#aaa" }]}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
    padding: 20,
    justifyContent: "space-between",
  },
  // cancel: {
  //   color: "#0057FF",
  //   fontSize: 16,
  //   marginBottom: 20,
  // },
  cancelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  cancelText: {
    color: "#0057FF",
    fontSize: 24,
    marginLeft: 2,
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 30,
  },
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
