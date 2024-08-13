import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import GradientButton from "@/components/GradientButton";
import MTextInput from "@/components/MTextInput";
import PostCard, { IPostCard } from "@/components/PostCard";
import { Colors } from "@/constants/Colors";
import { Gradients } from "@/constants/Gradients";
import { createPost } from "@/firebase/firestore/create";
import { fetchPost } from "@/firebase/firestore/read";
import { auth } from "@/firebaseConfig";
import { fontSize, heightScale, layoutStyles, widthScale } from "@/styles";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useSession } from "@/app/ctx";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToFirebase } from "@/firebase/firestore/upload";

export default function HomeScreen() {
  const { signOut } = useSession();
  const colorScheme = useColorScheme() ?? "light";
  const [post, setPost] = useState<IPostCard>();
  const [loading, setLoading] = useState(false);
  const [postMessage, setPostMessage] = useState("");

  const [photos, setPhotos] = useState<Record<string, string>>({});

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setPhotos({
        name: result.assets[0].fileName ?? "",
        uri: result.assets[0].uri ?? "",
      });
    }
  };

  const getPost = async () => {
    // fetch post
    const res = await fetchPost();

    if (res.length) {
      const data = res[0].data();
      console.log(data);

      setPost({
        post: data.post,
        time: data.createdAt.seconds * 1000,
        email: data.email,
        image: data.image,
      });
    }
  };

  const newPost = async () => {
    // fetch post
    try {
      if (postMessage === "") {
        alert("Please enter a post message");
        return;
      }
      setLoading(true);
      if (photos.uri) {
        const url = await uploadImageToFirebase(photos.uri, photos.name);

        if (url) {
          const res = await createPost({
            post: postMessage,
            image: url,
          });

          if (res != null) {
            setPost({
              post: postMessage,
              time: Date.now(),
              email: auth.currentUser?.email ?? "",
              image: url,
            });
          }
        }
      } else {
        const res = await createPost({
          post: postMessage,
        });

        if (res != null) {
          setPost({
            post: postMessage,
            time: Date.now(),
            email: auth.currentUser?.email ?? "",
          });
        }
      }
      setPhotos({});
      setPostMessage("");
      setLoading(false);
    } catch (error) {
      console.log("error", error);

      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getPost();
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView
      style={[
        layoutStyles.flex,
        { backgroundColor: Colors[colorScheme].white },
      ]}
    >
      <LoadingIndicator loading={loading} />
      <ScrollView>
        <View
          style={[
            styles.postList,
            {
              borderColor: Colors[colorScheme].primary_3,
            },
          ]}
        >
          <Text
            style={[styles.title, { color: Colors[colorScheme].primary_3 }]}
          >
            Newest Post
          </Text>
          {post != null ? (
            <PostCard
              post={post.post}
              email={post.email}
              time={post.time}
              image={post.image}
            />
          ) : (
            <View style={layoutStyles.center}>
              <Text>No post</Text>
            </View>
          )}
        </View>
        <MTextInput
          placeholder="Enter Text Post Here"
          numberOfLines={5}
          multiline={true}
          style={styles.textInput}
          onChangeText={setPostMessage}
          value={postMessage}
        />
        {photos.uri && (
          <View style={layoutStyles.center}>
            <Text>{photos.name}</Text>
            <Image
              source={{ uri: photos.uri }}
              style={{ width: 100, height: 100 }}
              resizeMode="cover"
            />
          </View>
        )}
        <GradientButton
          text="Add Image"
          onPress={pickImage}
          colors={Gradients[colorScheme].button}
          style={[styles.button, styles.mt10]}
          textStyle={styles.buttonText}
        />
        <GradientButton
          text="Post"
          onPress={newPost}
          colors={Gradients[colorScheme].button}
          style={[styles.button, styles.mt10]}
          textStyle={styles.buttonText}
        />
        <GradientButton
          text="Logout"
          onPress={signOut}
          colors={Gradients[colorScheme].button}
          style={[styles.button, styles.mt10]}
          textStyle={styles.buttonText}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postList: {
    paddingTop: heightScale(17),
    paddingHorizontal: heightScale(27),
    paddingBottom: heightScale(38),
    borderWidth: 1,
  },
  title: {
    fontSize: fontSize(40),
    fontWeight: "700",
    lineHeight: heightScale(42),
    textAlign: "center",
    marginBottom: heightScale(17),
  },
  textInput: {
    height: heightScale(115),
    lineHeight: heightScale(23),
    fontSize: fontSize(19),
    marginHorizontal: widthScale(52),
    marginTop: heightScale(128),
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
  mt10: {
    marginTop: heightScale(10),
  },
});
