import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function IntroScreen() {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const [step, setStep] = useState(1);

  useEffect(() => {
    const animate = () => {
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    };

    animate();

    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev === 4) {
          clearInterval(timer);
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    if (step === 1 || step === 2) {
      return (
        <View style={[styles.center, { backgroundColor: "#fff" }]}>
          <Animated.Image
            source={require("../assets/images/shippex-logo2-square.png")}
            style={[styles.icon, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </View>
      );
    }

    if (step === 3) {
      return (
        <View style={[styles.center, { backgroundColor: "#002DC4" }]}>
          <Image
            source={require("../assets/images/shippex-logo-3.png")}
            style={styles.fullLogo}
          />
        </View>
      );
    }

    return (
      <View style={[styles.fullScreenBlue]}>
        <View style={styles.topLogoContainer}>
          <Image
            source={require("../assets/images/shippex-logo-3.png")}
            style={styles.fullLogo}
          />
        </View>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 120,
    height: 120,
  },
  fullLogo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
  },
  buttonText: {
    color: "#002DC4",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  fullScreenBlue: {
    flex: 1,
    backgroundColor: "#002DC4",
    justifyContent: "space-between",
    paddingVertical: 60,
    paddingHorizontal: 0,
  },

  topLogoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomButtonContainer: {
    width: "100%",
    paddingBottom: 40,
    alignItems: "center",
  },
});
