import { toast } from "react-toastify";

function showSuccess(msg) {
  return toast.success(msg);
}

function showInfo(msg) {
  return toast.info(msg);
}

function showWarning(msg) {
  return toast.warning(msg);
}

function showError(msg) {
  return toast.error(msg);
}

function handleError(error) {
  //error handling block
  //accept any error
  //parse error
  //show then in UI

  debugger;  //It will pause the flow
  const errors = error.response.data;
  let errMsg;
  if (errors && errors.msg) {
    errMsg = errors.msg;
  }
  showError(errMsg);
}

export default {
  showSuccess,
  showInfo,
  showWarning,
  handleError
};
