import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useSession } from "./ctx";
import { router } from "expo-router";
import GradientButton from "@/components/GradientButton";
import { Gradients } from "@/constants/Gradients";
import { fontSize, heightScale, layoutStyles, widthScale } from "@/styles";
import Divider from "@/components/Divider";
import { Colors } from "@/constants/Colors";
import MTextInput from "@/components/MTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function SignUp() {
  const colorScheme = useColorScheme() ?? "light";
  const { register } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useRef({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleLogin = async () => {
    setLoading(true);
    if (
      form.current.password !== "" &&
      form.current.password !== form.current.confirmPassword
    ) {
      //Adicione sua lógica de erro aqui
      return;
    }

    const res = await register({
      email: form.current.email,
      password: form.current.password,
    });

    if (res != null) {
      alert("Register success");
      router.replace("/");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={layoutStyles.flex}>
      <LoadingIndicator loading={loading} />
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: Colors[colorScheme].primaryTitle }]}
        >
          Create an account
        </Text>
        <MTextInput
          placeholder="Email"
          style={[styles.w100, styles.mb45]}
          onChangeText={(text) => (form.current.email = text)}
        />
        <MTextInput
          placeholder="Password"
          style={styles.w100}
          secureTextEntry
          onChangeText={(text) => (form.current.password = text)}
        />
        <MTextInput
          placeholder="Confirm Password"
          style={[styles.w100, styles.mt13]}
          secureTextEntry
          onChangeText={(text) => (form.current.confirmPassword = text)}
        />
        <GradientButton
          text="Create Account"
          onPress={handleLogin}
          colors={Gradients[colorScheme].button}
          style={[styles.button, styles.mt37]}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: widthScale(50),
  },
  title: {
    fontSize: fontSize(40),
    fontWeight: "700",
    lineHeight: heightScale(48),
    marginBottom: heightScale(35),
    textAlign: "center",
    marginTop: heightScale(86),
  },
  button: {
    alignSelf: "center",
    height: heightScale(43),
    width: widthScale(215),
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.2,
    elevation: 5, // for Android
  },
  buttonText: {
    fontSize: fontSize(19),
    fontWeight: "700",
    lineHeight: heightScale(23),
  },
  text: {
    fontSize: fontSize(19),
    lineHeight: heightScale(23),
  },
  dividerView: {
    width: "70%",
    columnGap: widthScale(8),
    marginTop: heightScale(140),
    marginBottom: heightScale(95),
  },
  w100: {
    width: "100%",
  },
  mt37: {
    marginTop: heightScale(37),
  },
  mt13: {
    marginTop: heightScale(13),
  },
  mb45: {
    marginBottom: heightScale(45),
  },
});
