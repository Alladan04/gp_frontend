import "./Draft.scss"
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDraftRequest} from "../../hooks/useRequest";
import { Button } from "react-bootstrap";

const Draft = ({ request_id }: { request_id: number | null }) => {
    const { request, fetchRequest } = useDraftRequest();
    const navigate = useNavigate();
    console.log("Draft", request)
    useEffect(() => {
        if(request_id !== null) {
            //fetchRequest(request_id);
        }
    }, [request_id]);
    useEffect(() => {
       request_id = request?.data.request.id
       console.log("Use effect in dragt", request, request?.data.request.id)
    }, [request?.data.request.id]);

    return (
        <>
            <Button
                
                onClick={(e) => { 
                    if ( request_id == null) e.preventDefault(); 
                    console.log("Clicked draft", request_id)
                    if (request_id!=null){
                        navigate (`/request/${request_id}/`)
                    }
                    
                
                }}
                className={`lesson-constructor-container ${request_id == null ? 'disabled-link' : ''}`} 
            >
                <span className="title">Черновик</span>
             
            </Button>
        </>
    );
};

export default Draft;