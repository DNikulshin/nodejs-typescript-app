import { AxiosError } from "axios"
import { toast } from "react-toastify"


export default function (error: AxiosError & Error | unknown) {
    if (error instanceof AxiosError) {
        console.log(error, 'AxiosError');
        toast(error?.response?.data?.message || error?.message, { type: 'error' })
        return error?.response?.data?.errors

    } else if (error instanceof Error) {
        console.log(error, 'Error');
        toast(error?.message, { type: 'error' })

        return [{ msg: error?.message }]

    } else {
        console.log(error, 'unknownError');
        toast(String(error) ?? 'Непредвиденная Ошибка!', { type: 'error' })

        throw error
    }
}
