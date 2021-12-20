import Swal from "sweetalert2";

export const SuccessAlert = (msg, path) => {
  Swal.fire({
    title: msg,
    icon: "success",
    showConfirmButton: false,
    timer: 3000,
  });
};

export const FailAlert = (msg, path) => {
  Swal.fire({
    title: msg,
    icon: "error",
    showConfirmButton: false,
    timer: 5000,
  });
};
