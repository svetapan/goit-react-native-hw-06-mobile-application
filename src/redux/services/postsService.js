import { db } from "../../../config";
import { collection, addDoc } from "firebase/firestore";

export const writePostToFirestore = async (
  previewImage,
  title,
  locationText,
  location
) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      previewImage: previewImage,
      title: title,
      locationText: locationText,
      location: location,
      comments: [],
      likes: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
