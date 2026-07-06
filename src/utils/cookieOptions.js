const isProduction = process.env.NODE_ENV === "production";
const useSecureCookies = process.env.COOKIE_SECURE === "true" || isProduction;

export const getCookieOptions = (maxAge = 7 * 24 * 60 * 60 * 1000) => ({
  httpOnly: true,
  sameSite: useSecureCookies ? "none" : "lax",
  secure: useSecureCookies,
  maxAge,
});

export const getClearCookieOptions = () => ({
  httpOnly: true,
  sameSite: useSecureCookies ? "none" : "lax",
  secure: useSecureCookies,
});
