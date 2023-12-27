import {useDispatch, useSelector} from 'react-redux';
import {
    updateRequest
} from "../slices/draftSlice";
import axios from "axios";
import {useSid} from "./useSid";

export function useDraftRequest() {

    const { session_id } = useSid()

    const request = useSelector((state : any) => state.draft.request);

    const dispatch = useDispatch()

    const setRequest = (value : any) => {
        dispatch(updateRequest(value))
    }

    const fetchRequest = async () => {

        const response = await axios(`http://localhost:8000/request/${request.id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': session_id
            },
        })

        if (response.status != 404)
        {
            setRequest(response.data)
            console.log("Request DATA", response.data)
        }
        else{
            console.log('ERROR WHILE GETTING DRAFT REQUEST')
        }
    }

    const addOperationToRequest = async (id:any) => {
        const response = await axios(`http://localhost:8000/operation/${id}/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })

        if (response.status == 200)
        {
            setRequest(response.data)
        }
    }
/*
    const saveRequest = async () => {
        try {

            await axios(`http://localhost:8000/request/${request.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
                data: request
            })

        } catch (e) {
            console.log(e)
        }
    }
*/
    const formRequest = async () => {

        const response = await axios(`http://localhost:8000/request/form/${request.id}/`, {
            method: "PUT",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            setRequest(undefined)
        }
    }

    const deleteRequest = async () => {

        const response = await axios(`http://localhost:8000/request/${request.id}/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            setRequest(undefined)
        }
    }
    const resetRequest = () => {
        dispatch(updateRequest(null))
    }
    const deleteOperationFromRequest= async (id:any) => {
        const response = await axios(`http://localhost:8000/request/operation/${id}`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200) {
            setRequest(response.data)
        }
    }

    return {
        request,
        setRequest,
        addOperationToRequest,
        formRequest,
        deleteRequest,
        deleteOperationFromRequest,
        fetchRequest,
        resetRequest
    };
}