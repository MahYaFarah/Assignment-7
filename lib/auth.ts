export type LocalUser = { name: string; email: string; provider?: string };
const KEY = "bazardor-user";

export function getStoredUser(): LocalUser | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.localStorage.getItem(KEY) || "null") as LocalUser | null; } catch { return null; }
}

export function setStoredUser(user: LocalUser) { window.localStorage.setItem(KEY, JSON.stringify(user)); window.dispatchEvent(new Event("bazardor-auth")); }
export function clearStoredUser() { window.localStorage.removeItem(KEY); window.dispatchEvent(new Event("bazardor-auth")); }
