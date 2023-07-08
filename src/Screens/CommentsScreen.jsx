import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { db } from "../../config";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/slices/commentSlice";

const CommentsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);
  const [comment, setComment] = useState("");
  const [postItem, setPostItem] = useState(null);
  const [isCommentEntered, setIsCommentEntered] = useState(false);

  const route = useRoute();
  const { postId } = route.params;

  useEffect(() => {
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const post = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .filter((docData) => docData.id === postId);

        setPostItem(post[0]);
        return post;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    getDataFromFirestore();
  }, []);

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })} | ${currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const hanlePostComment = () => {
    const trimmedComment = comment.trim();

    if (isCommentEntered && trimmedComment !== "") {
      setComment(trimmedComment);

      dispatch(addComment({ postId, comment: trimmedComment, formattedDate }));

      setComment("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonReturn}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              style={styles.iconReturn}
              source={require("../images/arrow-return.png")}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleContainerText}>Коментарі</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          {postItem && (
            <Image
              style={styles.imageItem}
              source={{ uri: postItem.data.previewImage }}
              resizeMode="cover"
            />
          )}
        </View>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.mainContent}>
            <View style={styles.publicationContainer}>
              <View style={styles.commentsContainer}>
                {postItem &&
                  postItem.data.comments.map((comment, index) => (
                    <View
                      style={[
                        styles.commentItem,
                        index % 2 === 0 ? styles.commentItemReverse : null,
                      ]}
                      key={index}
                    >
                      <Image
                        style={styles.commentAvatar}
                        source={require("../images/avatar-blank.jpg")}
                      />
                      <View
                        style={[
                          styles.comment,
                          index % 2 === 0 ? styles.commentReverse : null,
                        ]}
                      >
                        <Text style={styles.commentText}>
                          {comment.comment}
                        </Text>
                        <Text style={styles.commentDate}>{comment.date}</Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.formContainer}>
          <TextInput
            style={[
              [styles.input],
              focusedInput === "comment" && [styles.inputFocused],
            ]}
            placeholderTextColor={"#BDBDBD"}
            placeholder="Коментувати..."
            name="comment"
            value={comment}
            onChangeText={(text) => {
              setComment(text);
              setIsCommentEntered(text.trim() !== "");
            }}
            onFocus={() => setFocusedInput("comment")}
            onBlur={() => setFocusedInput(null)}
          />
          <TouchableOpacity
            style={styles.buttonPost}
            onPress={hanlePostComment}
            disabled={!isCommentEntered || comment.trim() === ""}
          >
            <Image
              style={styles.buttonPostIcon}
              source={require("../images/arrow-up.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  page: {
    position: "relative",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 44,
    paddingBottom: 22,
  },
  header: {
    position: "relative",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    hesght: 44,
  },
  buttonReturn: {
    position: "absolute",
    marginTop: 10,
    height: 24,
    left: 16,
  },
  iconReturn: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    width: 175,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  titleContainerText: {
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    paddingBottom: 11,
    paddingTop: 11,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContent: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    flex: 1,
  },
  publicationContainer: {
    marginBottom: 82,
  },
  imageContainer: {
    position: "relative",
    marginLeft: 16,
    marginTop: 32,
    marginRight: 16,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    marginBottom: 32,
  },
  imageItem: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentsContainer: {
    gap: 24,
  },
  commentItem: {
    gap: 16,
    flexDirection: "row",
    width: "100%",
  },
  commentItemReverse: {
    flexDirection: "row-reverse",
  },
  commentAvatar: {
    borderRadius: 28,
    width: 28,
    height: 28,
  },
  comment: {
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 16,
    flex: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  commentReverse: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
    marginTop: 8,
  },
  commentDateReverse: {
    textAlign: "left",
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 16,
    backgroundColor: "#fff",
    right: 0,
  },
  input: {
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    padding: 16,
    height: 50,
    borderRadius: 25,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    color: "#000",
  },
  buttonPost: {
    position: "absolute",
    right: 24,
    top: 24,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    borderRadius: 34,
    justifyContent: "center",
  },
  buttonPostIcon: {
    width: 10,
    height: 14,
  },
});
