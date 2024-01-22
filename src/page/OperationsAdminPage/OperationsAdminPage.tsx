import {useState, useEffect, useMemo} from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';

import SearchOperations from '../../components/SearchBar/Search.js';

import axios from "axios";
import { useSid } from '../../hooks/useSid.js';

import { useAuth } from '../../hooks/useAuth.js';
import './OperationsAdminPage.scss'

import OperationButton from '../../components/Buttons/OperationButton.js';
import { useOperation } from '../../hooks/useOperation.js';
//import defaultImage from '../../assets/Default.png';

const statuses = [
    {
        id: 1,
        name: "действует"
    },
    {
        id: 2,
        name: "удалён"
    },
]

const OperationTable = () => {
    
    const [operations, setOperations] = useState({
        request_id: null,
        data: [],
    });

    const [tData, setTitlePage] = useState<string>("");
    const [titleData, setSearchData] = useState<string>("");
    const { session_id } = useSid()

    const {is_moderator} = useAuth()

    const { changeOperation } = useOperation()

    const searchOperations = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/operation/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    text: titleData
                }
            });
            console.log("got operration data from operationAdminPage", data)
            setOperations(data);
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            /*const filteredFines = filterOperations(mockOperations, titleData);
            setOperations({
                request_id: null,
                operations: filteredOperations,
            });*/
        }
    };

    const filterOperations = (fines: any, searchText: any) => {
        return operations.filter((fine: any) => {
            const titleLowerCase = fine.title.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return titleLowerCase.includes(searchTextLowerCase);
        });
    };
    

    const formData = new FormData();
    formData.append('status', "удалён");

    const handleDelete = async (id: any) => {
        try {
            await changeOperation(id, formData);
            console.log("sent request to delete an operation")
           searchOperations();
        } catch (error) {
            console.error("Произошла ошибка при удалении штрафа", error);
        }
    };

    

    const data = useMemo(() => operations.data, [operations.data])

    const columns = useMemo(
        () => [
            // Define columns as per your data
           /* {
                Header: "Цена",
                accessor: "price",
                Cell: ({ value }) => `${value}₽` // предполагается, что value - это цена
            },*/
            {
                Header: "Название",
                accessor: "name"
                // You can also add Cell property here to customize the rendering
            },
            // {
            //     Header: "Статус",
            //     accessor: "status",
            //     Cell: ({ value }) => { 
            //         const statusObject = statuses.find(status => status.id === value);
            //         return statusObject ? statusObject.name : 'Неизвестный статус';
            //     }
            //     // You can also add Cell property here to customize the rendering
            // },
            {
                Header: "Изображение",
                accessor: "image",
                Cell: ({ value }) => <img src={"data:image/png;base64,"+value} alt="OperationsImg" style={{ width: "50px", height: "auto" }} />
            },
            {
                Header: "Действия",
                id: "actions",
                // Cell property может быть функцией, которая принимает объект с данными ячейки
                Cell: ({ row }) => (
                    <div>
                    <Link to={`/operation/edit/${row.original.pk}`}>
                        <OperationButton text="Редактировать" onClick={()=>{}} />
                    </Link>
                    <OperationButton onClick={() => handleDelete(row.original.pk)} text="Удалить" />
                    </div>
                )
            },


            // Add other columns as needed
            
        ],
        []
    )

    // Use useTable hook to create table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    useEffect(() => {
        searchOperations()
    }, [titleData])

    return (
        <>
        {is_moderator &&
        <div className="fines-wrapper">
            <div className="top-container">
                <div className='search_in_menu'>
                <SearchOperations title={tData} setTitle={(newTitle) => {
                    setTitlePage(newTitle);
                   // searchOperations(); 
                }}
                    setSubmitData={(newTitle)=>{
                         setSearchData(newTitle);
                         //searchOperations();
                    }}
                />
                </div >
                <div style={{marginTop:'10px', marginBottom:'10px'}}>
                <Link to="/operation/add" >
                    <OperationButton text="Добавить операцию" onClick={()=>{}}/>
                </Link>
                </div>
            </div>
            <div className="bottom-container">
                {/* Create table structure */}
                <table {...getTableProps()} className="fines-table">
                    <thead>
                        {/* Loop over header rows */}
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {/* Loop over headers in each row */}
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        }

</>
    )

}

export default OperationTable;