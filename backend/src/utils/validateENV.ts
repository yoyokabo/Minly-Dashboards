import { cleanEnv } from "envalid";
import { port, str , num } from "envalid/dist/validators"

export default cleanEnv(process.env , {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SALT_ROUNDS: num(),
    JWT_SECRET: str()
});