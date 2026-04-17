const FALLBACK_API_URL = "https://skillsphere-0iqe.onrender.com/api";

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

const isLocalHost = (hostname: string): boolean =>
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "0.0.0.0" ||
  hostname === "::1";

const safeParseUrl = (value: string, base?: string): URL | null => {
  try {
    return new URL(value, base);
  } catch {
    return null;
  }
};

const fallbackApi = new URL(FALLBACK_API_URL);
const fallbackSocketOrigin = `${fallbackApi.protocol}//${fallbackApi.host}`;

const resolveApiBaseUrl = (): string => {
  const rawEnvApiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  const apiUrl = safeParseUrl(rawEnvApiUrl || FALLBACK_API_URL, window.location.origin);

  if (!apiUrl) {
    return trimTrailingSlash(FALLBACK_API_URL);
  }

  if (import.meta.env.PROD && isLocalHost(apiUrl.hostname)) {
    return trimTrailingSlash(FALLBACK_API_URL);
  }

  return trimTrailingSlash(apiUrl.toString());
};

const resolveSocketServerUrl = (apiBaseUrl: string): string => {
  const rawEnvSocketUrl = (import.meta.env.VITE_SOCKET_URL as string | undefined)?.trim();

  if (rawEnvSocketUrl) {
    const socketUrl = safeParseUrl(rawEnvSocketUrl, window.location.origin);
    if (socketUrl) {
      if (import.meta.env.PROD && isLocalHost(socketUrl.hostname)) {
        return fallbackSocketOrigin;
      }
      return `${socketUrl.protocol}//${socketUrl.host}`;
    }
  }

  const parsedApi = safeParseUrl(apiBaseUrl, window.location.origin);
  if (!parsedApi) {
    return fallbackSocketOrigin;
  }

  return `${parsedApi.protocol}//${parsedApi.host}`;
};

export const API_BASE_URL = resolveApiBaseUrl();
export const SOCKET_SERVER_URL = resolveSocketServerUrl(API_BASE_URL);
