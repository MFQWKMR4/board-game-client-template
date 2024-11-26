import { ErrorDetail } from "@/types"

export const clientError = (message: string) => {
    const ed: ErrorDetail = {
        senderId: "client",
        errorSummary: "Client error",
        errorMessage: message,
        requestJson: "",
    }
    return ed
}
