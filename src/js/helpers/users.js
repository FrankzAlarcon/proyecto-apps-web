const USERS_KEY = "users"

export function getUsers() {
  let usersString = localStorage.getItem(USERS_KEY)
  if (!usersString) {
    const initialValue = [{name: "Frankz Alarcon", phone: "0987654321", email: "frankz@correo.com", password: "12345678", role: "admin"}]    
    localStorage.setItem(USERS_KEY, JSON.stringify(initialValue))
    return initialValue
  }
  const users = JSON.parse(usersString)  
  return users
}

export function addUser(user) {
  const users = getUsers()
  const newUsers = [...users, user]
  localStorage.setItem(USERS_KEY, JSON.stringify(newUsers))
  return newUsers
}
