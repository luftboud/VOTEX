const FILE_ID = "([a-zA-Z0-9_-]+)";

const ID_PATTERNS = [
    new RegExp(`/file/d/${FILE_ID}`),
    new RegExp(`[?&]id=${FILE_ID}`),
    new RegExp(`googleusercontent\\.com/d/${FILE_ID}`),
    new RegExp(`^${FILE_ID}$`),
];

export function googleDriveImageUrl(rawUrl, size = 200) {
    const value = typeof rawUrl === "string" ? rawUrl.trim() : "";
    if (!value) {
        return "";
    }

    const fileId = ID_PATTERNS.map((pattern) => value.match(pattern)?.[1]).find(Boolean);
    if (!fileId) {
        return value;
    }

    return `https://lh3.googleusercontent.com/d/${fileId}=w${size}`;
}
