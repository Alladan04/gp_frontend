import {useState, useEffect} from 'react'
import {
    OpRes,
    GetFilteredOps
} from './GetOperations.ts'
import OperationCard from './OperationCard.tsx';
import SearchOperation from './Search.tsx';
import './styles/OperationsPage.css'
import MyNavBar from '../NavBar/NavBar.tsx'
//import { Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BreadCrumbs from '../BreadCrumb/BreadCrumb.tsx'
//import {Crumbs} from '../BreadCrumb/BreadCrumb.tsx'
function Operations() {
    
    const [Operation_, setOperation] = useState<OpRes>({
        request_id: null,
        data:[],
    });

    const fetchData = async (tltleData: any) => {
        const data = await GetFilteredOps(tltleData);
        setOperation(data);
    };

    useEffect(() => {
        fetchData(tltleData);
    },[]);

    const setOperationData = (data: any) => {
        //console.log('After filtration: ', data)
        setOperation(data);
    }

    const [tltleData, setTltleData] = useState('');
    const location = useLocation();
   
    let crumb ={data:[{name:"Operation", path:location.pathname}]};
   
    return (
        <>
   
     <MyNavBar></MyNavBar>
     
        <div className='search_in_menu'><SearchOperation setOperationData={setOperationData} setTitleData={setTltleData}/></div>
        
        <ul className="card-grid" >
        <BreadCrumbs crumbs = {crumb}></BreadCrumbs>
            <div className="container flex-container">
            
                {Operation_.data.map((object) => (
                <OperationCard key = {object.pk} operationData={object}/>
                ))}
       
            </div>
            </ul>
        </>
    );
};

export default Operations;