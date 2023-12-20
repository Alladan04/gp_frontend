import Cookies from "universal-cookie";

export function useSid() {
    const cookies = new Cookies()

    const session_id = cookies.get("session_id");

    

    const setSid = (value: any) => {
        cookies.set("session_id", value,)
    }

    const resetSid = () => {
        cookies.set("session_id", undefined)
    }

    return {
        session_id,
        setSid,
        resetSid,
    };
}