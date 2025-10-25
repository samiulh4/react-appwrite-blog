import Swal from 'sweetalert2';

export const showSuccessAlert = (title, message) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        confirmButtonColor: '#3085d6'
    });
};

export const showErrorAlert = (title, message) => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        confirmButtonColor: '#d33'
    });
};

export const showConfirmDialog = (title, message) => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });
};

export const showLoadingAlert = (title = 'Loading...') => {
    Swal.fire({
        title: title,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

export const closeLoadingAlert = () => {
    Swal.close();
};