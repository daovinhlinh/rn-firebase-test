import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { fontSize, heightScale } from "@/styles";
import { Colors } from "@/constants/Colors";
import { formatTimestamp } from "@/Utils";

export interface IPostCard {
  post: string;
  email: string;
  time: number;
  image?: string;
}

const PostCard = ({ post, email, time, image }: IPostCard) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: Colors[theme].primary_3,
        },
      ]}
    >
      <Text style={[styles.text, styles.mb23]}>Post: {post}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Time posted: {formatTimestamp(time)}</Text>
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    padding: heightScale(8),
  },
  text: {
    fontSize: fontSize(19),
    lineHeight: fontSize(23),
  },
  mb23: {
    marginBottom: heightScale(23),
  },
  image: {
    width: heightScale(100),
    height: heightScale(100),
    alignSelf: "center",
    marginTop: heightScale(10),
  },
});
