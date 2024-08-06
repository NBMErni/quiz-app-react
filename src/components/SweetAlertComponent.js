import Swal from "sweetalert2";

const SweetAlertComponent = () => {
  const showSuccessMessage = (title, text) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      confirmButtonText: "OK",
    });
  };

  const showErrorMessage = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      confirmButtonText: "OK",
    });
  };

  const showConfirmMessage = (title, text, confirmCallback) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  };

  return {
    showSuccessMessage,
    showErrorMessage,
    showConfirmMessage,
  };
};

export default SweetAlertComponent;
