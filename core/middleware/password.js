import crypto from "crypto";

const password = "MiPasswordSuperSecreta";
const hash = crypto.createHash("sha256").update(password).digest("hex");

console.log(hash);
