import { collection, doc, getDocs, query, deleteDoc, addDoc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { dbConfig } from "./dbConfig"

export const getAllServices = async () => {
  const servicesCollection = collection(db, dbConfig.services)
  const q = query(servicesCollection)
  const qs = await getDocs(q)
  return qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getServiceById = async (id) => {
  const serviceReference = doc(db, dbConfig.services, id)
  const service = await getDoc(serviceReference)
  return service.data()
}

export const deleteService = async (id) => {
  const serviceReference = doc(db, dbConfig.services, id)
  await deleteDoc(serviceReference)
}

export const createService = async (data) => {
  try {
    const servicesCollection = collection(db, dbConfig.services)
    await addDoc(servicesCollection, data)
    return true
  } catch (error) {
    return null
  }
}

export const updateService = async (id, changes) => {
  try {
    await updateDoc(doc(db, dbConfig.services, id), changes)
    return true
  } catch (error) {
    console.log(error)
    return null
  }
}