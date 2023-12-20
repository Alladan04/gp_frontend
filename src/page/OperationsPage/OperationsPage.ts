import {useState, useEffect} from 'react'
//import { ListOperations } from '../../components/Interfaces.ts';
//import SearchOperations from './SearchBar/Search.tsx';
//import OperationCard from "../../components/OperationCard/OperationCard";
//import RequestBasket from "../../components/RequestBasket/RequestBasket";
import "./OperationsPage.css"
import axios from "axios";
import {useSid} from "../../hooks/useSid";
//import { mockOperations } from '../../assets/Mock.ts';

const Operations = () => {
    
    const [operations, setOperations] = useState<ListOperations>({
        request_id: null,
        operations: [],
    });

    const [nameData, setTitlePage] = useState<string>("");

    const { session_id } = useSid()

    const searchOperations = async () => {

        const {data} = await axios(`http://127.0.0.1:8000/operation/`, {
            method: "GET",
            headers: {
                'authorization': session_id
            },
            params: {
                name: nameData
            }
        })

        setOperations(data)

    }

    useEffect(() => {
        searchOperations()
    }, [nameData])

    return (
    
    )
}

export default Operations;
