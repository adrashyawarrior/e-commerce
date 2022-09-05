import { toast } from 'react-toastify'

export default class Toast {
    static sucessToast(message = "!!! Success !!!") {
        return toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}