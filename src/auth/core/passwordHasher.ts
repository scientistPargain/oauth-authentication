import crypto from "crypto"

// Salt: to distinguish passwords if same are given by user(For security purposes)
// In this way if two user gives same pass, their hashes will be diff so hacker will not be able to decode hashes even if they get the hashes password.
export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error)

      resolve(hash.toString("hex").normalize())
    })
  })
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string
  salt: string
  hashedPassword: string
}) {
  const inputHashedPassword = await hashPassword(password, salt)

  // using timingSafeEqual instead of '===' because it takes equal time for checking if two hashes are equal no matter what, unlike the '==='
  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  )
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize()
}
