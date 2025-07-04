export const BACKEND_URL =
  process.env.BACKEND_URL ||
  "http://b2b2buildingblocks.westeurope.cloudapp.azure.com:8080/api";
export const createBackendRoute = (routes: string[] | string): string => {
  if (typeof routes === "string") {
    return [BACKEND_URL, routes].join("/");
  } else if (Array.isArray(routes)) {
    return [BACKEND_URL, ...routes].join("/");
  }

  throw new TypeError(
    "createBackendRoute only accepts a string or an array of strings.",
  );
};
