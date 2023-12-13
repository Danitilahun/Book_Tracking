import { toast } from "react-toastify";
import { toastConfig } from "./toastConfig";

export const showErrorToast = (errorMessage: string): void => {
  toast(errorMessage, toastConfig);
};
