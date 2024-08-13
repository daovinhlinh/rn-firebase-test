import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

import { useSession } from "../ctx";
export default function AppLayout() {
  const { session } = useSession();
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
