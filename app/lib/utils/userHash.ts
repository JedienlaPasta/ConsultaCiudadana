import crypto from "crypto";

const USER_HASH_SECRET =
  process.env.USER_HASH_SECRET ||
  "very_super_long_and_not_so_safe_secret_secret_for_hashes.";

export function generateUserHash(rut: string, dv: string) {
  return crypto
    .createHmac("sha256", USER_HASH_SECRET)
    .update(`${rut}-${dv}`)
    .digest("hex");
}
