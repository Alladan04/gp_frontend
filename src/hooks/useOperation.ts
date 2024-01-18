import {useDispatch, useSelector} from 'react-redux';
//import {updateOperation} from "../slices/operationSlice";
import {updateOperation} from "../slices/operationSlice"
import axios from "axios";
import { useSid } from './useSid';

export function useOperation() {
    const operation = useSelector((state:any) => state.operation.operation);

    const dispatch = useDispatch()
    const {session_id} = useSid()

    const setOperation = (value: any) => {
        dispatch(updateOperation(value))
    }

    const fetchOperation = async (id: any) => {
        const {data} = await axios(`http://127.0.0.1:8000/operation/${id}`, {
            method: "GET"
        });

        setOperation(data)
        return data
    }
    const changeOperation = async (operation_id: any, OperationData: any) => {
        try {
            const response = await axios({
                method: 'PUT',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/operation/${operation_id}/`,
                data: OperationData,  // Передаем данные, которые хотим изменить, в теле запроса
                
            });
            console.log("Changed Operation", response.data)
            setOperation(response.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending fine data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }
    const deleteOperation = async (operation_id: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/operation/${operation_id}/`,
                // Передаем данные, которые хотим изменить, в теле запроса
                
            });
            console.log("Deleted Operation", response.data)
            //setOperation(response.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending fine data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }
    const createOperation= async (OperationData: any) => {
        try {
            const response = await axios({
                method: 'POST',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/operation/`,
                data: OperationData,  // Передаем данные, которые хотим изменить, в теле запроса
                
            });
            console.log("Adding operation", response.data)
            setOperation(response.data.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending fine data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }
    

    return {
        operation,
        setOperation,
        fetchOperation,
        changeOperation,
        createOperation,
        deleteOperation
    };
}