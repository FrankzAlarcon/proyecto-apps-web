import { collection, doc, getDocs, query } from "firebase/firestore"
import { db } from "../firebase"
import { dbConfig } from "./dbConfig"

export const getAllServices = async () => {
  const servicesCollection = collection(db, dbConfig.services)
  const q = query(servicesCollection)
  const qs = await getDocs(q)
  return qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}