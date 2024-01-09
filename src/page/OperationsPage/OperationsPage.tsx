import {useState, useEffect} from 'react'
//import { ListOperations } from '../../components/Interfaces.ts';
//import SearchOperations from './SearchBar/Search.tsx';
//import OperationCard from "../../components/OperationCard/OperationCard";
//import RequestBasket from "../../components/RequestBasket/RequestBasket";
import Draft from '../../components/Draft/Draft';

import "./OperationsPage.css"
import axios from "axios";
import {useSid} from "../../hooks/useSid";
import SearchOperations from "../../components/SearchBar/Search"
import OperationCard from '../../components/OperationCard/OperationCard';
import MyNavbar from '../../components/NavBar/NavBar';
//import { mockOperations } from '../../assets/Mock.ts';

const Operations = () => {
    
    const [operations, setOperations] = useState({
        request_id: null,
        operations: [],
    });

    const [titleData, setTitlePage] = useState<string>("");
 

    const { session_id } = useSid()


    const searchOperations = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/operation`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    text: titleData
                }
            });
            console.log(data)
            setOperations({request_id: data.request_id, operations: data.data});
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
           // const filteredFines = filterFines(mockFines, titleData);
            setOperations({
                request_id: null,
                operations:[]// filteredFines,
            });
        }
    };

    /*const filterOperations = (fines: any, searchText: any) => {
        return fines.filter((operation: any) => {
            const titleLowerCase = operation.title.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return titleLowerCase.includes(searchTextLowerCase);
        });
    };
    */




    useEffect(() => {
        searchOperations()
    }, [titleData])
 
    return (
     <div>
           <MyNavbar request_id = {operations.request_id}></MyNavbar>
           
                <div className='search_in_menu'>
                <SearchOperations title={titleData} setTitle={(newTitle) => {
                    setTitlePage(newTitle);
                    searchOperations(); }}
                />
                </div>

                
         
            <ul className="my-card-grid">
            <div className = 'container flex-container'>
                {operations.operations.map((operation) => {
                    return <OperationCard operation={operation} key={operation}/>
                })}
                </div>
            </ul>
    
    
    </div>
    )

}

export default Operations;