import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { db } from "../firebase"
import { dbConfig } from "./dbConfig"

export const getAllAppointments = async () => {
  const appointmentsCollection = collection(db, dbConfig.appointments)
  const q = query(appointmentsCollection)
  const qs = await getDocs(q)
  const formattedAppointment = qs.docs.map(async (doc) => {
    const appointment = doc.data()
    const user = await getDoc(appointment.user)
    const services = appointment.services.map(async (service) => {
      const serviceDoc = await getDoc(service)
      return serviceDoc.data()
    })
    appointment.id = doc.id

    return {
      ...appointment,
      user: user.data(),
      services: await Promise.all(services)
    }
  })
  const appotinments = await Promise.all(formattedAppointment)
  console.log(appotinments)
  return appotinments
}

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