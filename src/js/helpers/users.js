const USERS_KEY = "users"

export function getUsers() {
  let usersString = localStorage.getItem(USERS_KEY)
  if (!usersString) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]))
    return []
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