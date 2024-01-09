import "./Draft.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDraftRequest} from "../../hooks/useRequest";

const Draft = ({ request_id }: { request_id: number | null }) => {
    const { request, fetchRequest } = useDraftRequest();
    console.log("Draft", request)
    useEffect(() => {
        if(request_id !== null) {
            fetchRequest(request_id);
        }
    }, [request_id]);

    return (
        <>
            <Link
                to={`/request/${request_id}/`}
                onClick={(e) => { if (request== null) e.preventDefault(); }}
                className={`lesson-constructor-container ${request == null ? 'disabled-link' : ''}`} 
            >
                <span className="title">Черновик</span>
                {request?.operations?.length > 0 && <span className="badge">{request?.operations?.length}</span>}
            </Link>
        </>
    );
};

export default Draft;