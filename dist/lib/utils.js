export function isValidUrl(u) {
    try {
        const url = new URL(u);
        return ["http:", "https:"].includes(url.protocol);
    }
    catch {
        return false;
    }
}
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function genCode(len = 7) {
    let out = "";
    for (let i = 0; i < len; i++) {
        out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return out;
}
