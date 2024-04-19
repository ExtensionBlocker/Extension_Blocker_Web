import axios from "axios";

const host = process.env.REACT_APP_DEV_HOST;

export const ExtensionAxios = axios.create({
  baseURL: `${host}/api/extensions`,
});
