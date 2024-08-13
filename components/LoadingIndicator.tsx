import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "@/constants/Colors";
import { layoutStyles } from "@/styles";

const LoadingIndicator = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        layoutStyles.center,
        {
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      ]}
    >
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
  );
};

export default memo(LoadingIndicator);
