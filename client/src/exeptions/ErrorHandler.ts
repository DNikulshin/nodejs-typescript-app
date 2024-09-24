import { AxiosError } from "axios"
import { toast } from "react-toastify"


export default function(error: AxiosError & Error | unknown ) {
    if(error instanceof AxiosError) {
        console.log(error, 'AxiosError');
        toast(error.message, {type: 'error'})
    } else if (error instanceof Error) {
        console.log(error, 'Error');
        toast(error.message, {type: 'error'})
        throw error
    } else {
        console.log(error, 'unknownError');
        toast(String(error), {type: 'error'})
        throw error
    }
}