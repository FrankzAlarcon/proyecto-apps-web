import { addDoc, collection, doc } from "firebase/firestore"
import { db } from "../firebase"
import { dbConfig } from "./dbConfig"

export const createAppointment = async (userId, appointmentData) => {
  try {
    const userReference = doc(db, dbConfig.users, userId)
    const servicesCollectionReference = collection(db, dbConfig.services)
    const appointment = {
      date: appointmentData.date,
      hour: appointmentData.time,
      isCompleted: false,
      services: appointmentData.services.map(service => doc(servicesCollectionReference, service.id)),
      user: userReference
    }
    const appointmentCollection = collection(db, dbConfig.appointments)
    await addDoc(appointmentCollection, appointment)
    return true
  } catch (error) {
    return null
  }
}