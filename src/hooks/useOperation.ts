import {useDispatch, useSelector} from 'react-redux';
//import {updateOperation} from "../slices/operationSlice";
import {updateOperation} from "../slices/operationSlice"
import axios from "axios";

export function useOperation() {
    const operation = useSelector((state:any) => state.operation.operation);

    const dispatch = useDispatch()

    const setOperation = (value: any) => {
        dispatch(updateOperation(value))
    }

    const fetchOperation = async (id: any) => {
        const {data} = await axios(`http://127.0.0.1:8000/operation/${id}`, {
            method: "GET"
        });

        setOperation(data)
    }

    return {
        operation,
        setOperation,
        fetchOperation
    };
}