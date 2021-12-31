import { toast } from 'react-toastify';


// toastr notification
export function notify(message, type) {
    toast(message, {
        type: type, className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    })
}


// handle exception error message
export function handleApiResponseExceptionMessage(error) {
    let message = "Something went wrong!";
    try {
        if (typeof error.response.data.error.details == "object") {
            Object.keys(error.response.data.error.details).forEach((key) => {
                message += error.response.data.error.details[key] + "\n";
            });
        }
        else if (typeof error.response.data.error.details == "string") {
            message = error.response.data.error.details;
        }
        else {
            message = JSON.stringify(error.response.data.error.details)
        }
    }
    catch (err) {
        console.log(err.message)
    }
    notify(message, "error")
};