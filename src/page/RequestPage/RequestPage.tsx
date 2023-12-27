//import "./BreachPage.scss"
import {useNavigate} from "react-router-dom";
import {useDraftRequest} from "../../hooks/useRequest"
import OperationCard from "../../components/OperationCard/OperationCard";
import { useAuth } from "../../hooks/useAuth";
import {useEffect} from "react";

const RequestPage = () => {
    const navigate = useNavigate()

    const {is_authenticated, auth} = useAuth()
    useEffect(()=>
    {
     console.log("calling auth from request page")
     auth()
    }, [])

    const {request, formRequest, deleteRequest} = useDraftRequest()

    useEffect(() => {
        if (!is_authenticated) {
          console.log("Not Authed")

         navigate("/operation")
        }
    }, [])

    if (!is_authenticated){
        return
    }

    if (request == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const cards =request.items.map(item => (
        <OperationCard operation={item} key={item.pk}/>
    ))

    const handleAdd = async () => {
        await formRequest()
        //navigate("/request")
    }

    const handleDelete = async () => {
        await deleteRequest()
       // navigate("/operation")
    }

    return (
        <div className="breach-page-wrapper">
        <div className="fines-wrapper">
            <div className="top">
                <h3>Нарушение</h3>
            </div>

            <div className="bottom">
                {cards}
            </div>
        </div>

        <div className="buttons-wrapper">
            <button className="order-button" onClick={handleAdd}>Отправить</button>
            <button className="delete-button" onClick={handleDelete}>Удалить</button>
        </div>
        </div>
    )
}

export default RequestPage