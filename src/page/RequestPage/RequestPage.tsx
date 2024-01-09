//import "./BreachPage.scss"
import "./RequestPage.css"
import {useNavigate, useParams} from "react-router-dom";
//import {useDraftBreach} from "../../hooks/useDraftBreach";
//import FineCard from "../../components/FineCard/FineCard";
import { useDraftRequest } from "../../hooks/useRequest";
import OperationCard from "../../components/OperationCard/OperationCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";
import RequestOperationCard from "../../components/RequestOperationCard/RequestOperationCard";

const RequestPage = () => {
    console.log("in request page")
    const { id } = useParams();
    const request_id = id ? parseInt(id, 10) : null;

    const navigate = useNavigate()

    const {is_authenticated} = useAuth()
    const {request, formRequest, deleteRequest, fetchRequest} = useDraftRequest()
    console.log(request)
    // useEffect(() => {
    //     if (!is_authenticated) {
    //         navigate("/fines")
    //     }
    // }, [])

    useEffect(() => {
        if(request_id !== null) {
            fetchRequest(request_id);
            
            console.log("fetched request from request page")
        }
    }, [request_id]);
  
    if (!is_authenticated){
        console.log('Not Authed')
        return
    }

    if (request == undefined)
    {
        console.log('Request is undefined')
        return (
            <div >
                <h1>Пусто</h1>
            </div>
        )
    }
    console.log("our Request ", request.data.items)
    const cards = request.data.items.map((item:any) => (
        <RequestOperationCard data={item} request = {request.data.request} key={item.id} />
      ));
    console.log(cards)

    const handleAdd = async () => {
        await formRequest()
        navigate("/request")
    }

    const handleDelete = async () => {
        await deleteRequest()
        navigate("/operation")
    }

    return (
        <div className="breach-page-wrapper">
            
        <div className="fines-wrapper">
            <div className="top">
                <h3>Конструктор заявки-черновика</h3>
            </div>
           
            <ul>
            <div className="buttons-wrapper">
            <button className="order-button" onClick={handleAdd}>Отправить</button>
            <button className="delete-button" onClick={handleDelete}>Удалить</button>
            </div>
                
                    
                    {cards}
              
            </ul>
        </div>

      
        </div>
    )
}

export default RequestPage