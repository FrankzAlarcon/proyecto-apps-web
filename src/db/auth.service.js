import { signInWithEmailAndPassword, createUserWithEmailAndPassword, confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../firebase"
import { dbConfig } from "./dbConfig"

export const getUserByEmail = async (email) => {
  const userCollection = collection(db, dbConfig.users)
  const q = query(userCollection, where('email', '==', email))
  const qs = await getDocs(q)
  return { id: qs.docs[0].id, ...qs.docs[0].data() }
}

export const login = async ({ email, password, role }) => {
  try {
    const authData = await signInWithEmailAndPassword(auth, email, password)
    if (!authData) {
      return location.href = '/index.html'
    }
    const loggedUser = await getUserByEmail(authData.user.email)
    if (loggedUser.role !== role) {
      return null
    }
    return loggedUser
  } catch (error) {
    return null
  }
}

export const register = async ({ name, phone, email, password }) => {
  try {
    const userData = {
      name,
      phone,
      email,
      password,
      role: 'customer'
    }
    await createUserWithEmailAndPassword(auth, email, password)
    const userCollection = collection(db, dbConfig.users)
    await addDoc(userCollection, userData)
    return true
  } catch (error) {
    return null
  }
}

export const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    return null
  }
}

export const resetPassword = (code, newPassword) => {
  return confirmPasswordReset(auth, code, newPassword)
}