import Divider from "@/components/Divider";
import GradientButton from "@/components/GradientButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import MTextInput from "@/components/MTextInput";
import { Colors } from "@/constants/Colors";
import { Gradients } from "@/constants/Gradients";
import { fontSize, heightScale, layoutStyles, widthScale } from "@/styles";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "./ctx";

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(false);
  const form = useRef({
    email: "",
    password: "",
  });

  const { signIn } = useSession();
  const handleLogin = async () => {
    setLoading(true);
    const user = await signIn({
      email: form.current.email,
      password: form.current.password,
    });
    if (user != null) {
      // alert("Login success");
      router.replace("/");
    }
    setLoading(false);
    //Antes de navegar, tenha certeza de que o usuário está autenticado
    // router.replace("/");
  };

  return (
    <SafeAreaView style={layoutStyles.flex}>
      <LoadingIndicator loading={loading} />
      <View style={styles.container}>
        <GradientButton
          link
          href={"/signup"}
          text="Sign up"
          colors={Gradients[colorScheme].button}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        <View style={[layoutStyles.flexRowCenter, styles.dividerView]}>
          <Divider />
          <Text style={[styles.text, { color: Colors[colorScheme].gray_4 }]}>
            or
          </Text>
          <Divider />
        </View>
        <MTextInput
          placeholder="Email"
          style={styles.w100}
          onChangeText={(text) => (form.current.email = text)}
        />
        <MTextInput
          placeholder="Password"
          style={[styles.w100, styles.mt13]}
          secureTextEntry
          onChangeText={(text) => (form.current.password = text)}
        />
        <GradientButton
          text="Log In"
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
    justifyContent: "center",
    paddingHorizontal: widthScale(50),
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
});
