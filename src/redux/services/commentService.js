import { db } from "../../../config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

 export const writeCommentToFirestore = async (postId, commentsItem) => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    const post = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
      .filter((docData) => docData.id === postId);

    const docRef = doc(collection(db, "posts"), postId);

    const array = post[0].data.comments;
    array.push(commentsItem);

    await updateDoc(docRef, {
      comments: array,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};