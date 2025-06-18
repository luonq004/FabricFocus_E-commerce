import dotenv from "dotenv"
import {createClerkClient} from "@clerk/clerk-sdk-node"

dotenv.config();

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
})
export default clerkClient