import { db, auth } from "../config/firebaseConfig";
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp 
} from "firebase/firestore";

const getNotes = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("userId", "==", user.uid)); 
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    return [];
  }
};

const addNote = async (title, content) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const noteRef = await addDoc(collection(db, "notes"), {
      title,
      content,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    return { id: noteRef.id, title, content, userId: user.uid, createdAt: new Date() };
  } catch (error) {
    console.error("Erro ao adicionar nota:", error);
    throw error;
  }
};

const deleteNotes = async (noteIds) => {
  try {
    const deletePromises = noteIds.map((noteId) => deleteDoc(doc(db, "notes", noteId)));
    await Promise.all(deletePromises);
    console.log("Notas excluídas:", noteIds);
  } catch (error) {
    console.error("Erro ao excluir notas:", error);
    throw error;
  }
};

export default {
  getNotes,
  addNote,
  deleteNotes,
};
