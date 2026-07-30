const API_BASE = "http://localhost:5000";

const DEFAULT_PROFILE_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
    <rect width="160" height="160" rx="32" fill="#e2e8f0"/>
    <circle cx="80" cy="68" r="32" fill="#94a3b8"/>
    <path d="M40 134c8-24 32-36 40-36s32 12 40 36" fill="#64748b"/>
  </svg>
`)}`;

export const getImageUrl = (path) => {
  if (!path) return DEFAULT_PROFILE_IMAGE;
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
};
