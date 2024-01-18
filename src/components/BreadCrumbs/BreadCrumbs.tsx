import "./BreadCrumbs.scss"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import { useOperation } from "../../hooks/useOperation";
import { useAuth } from "../../hooks/useAuth";

const BreadCrumbs = () => {

    const location = useLocation()

    let currentLink = ''

    const { operation, setOperation, fetchOperation } = useOperation()
    console.log(operation)
    //const {is_moderator} = useAuth()

    const resetSelectedSpare = () => setOperation(undefined)

    // const fines = is_moderator ? "Редактировать Штрафы" : "Штрафы";

    const topics = {
        "operation": "Операции",
        "draft": "Черновик",
        "request": "Заявки",
        "login": "Вход",
        "profile": "Профиль",
        "add": "Добавить",
        "edit": "Редактировать"
    }


    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedSpare}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
        const opexp = new RegExp('operation/([0-9]+)');
        if (currentLink.match(opexp))
        {
          console.log('hello from crumb')
          //fetchOperation(parseInt(currentLink.match(opexp)[1]))
          const num = parseInt(currentLink.match(opexp)[1])
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Операция №{num}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('edit/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                       {operation?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper" style = {{marginTop:'10px'}}>
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/operation"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default BreadCrumbs;