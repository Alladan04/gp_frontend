import {TableInstance, useTable, usePagination, useFilters} from "react-table"
import axios from "axios";
import { STATUSES } from "../../utils/consts";
import { ru } from "../../utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import { useSid } from "../../hooks/useSid";
import "./RequestsPage.scss"

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import OperationButton from "../../components/Buttons/OperationButton";
import { useNavigate } from "react-router-dom";
import {useFilters as FilterHook} from "../../hooks/useFilters"
const fetchRequestsData = async (filters: any, session_id: any, setRequestsData: any, setError: any, setLoadedOnce: any, setIsLoading: any) => {
    // Function to fetch data moved here and receives necessary state setters via parameters
    setIsLoading(true);
    setLoadedOnce(true);
    try {
      const { startDate, endDate, Status, userName } = filters;
      const { data } = await axios("http://localhost:8000/request/", {
        method: "GET",
        headers: { authorization: session_id },
        params: { downdate: startDate, update: endDate, status_list: Status },
      });
      setRequestsData(data.data);
      console.log("requests data fetchde", data.data)
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };

  const staticColumns = [
    {
        Header: "№",
        accessor: "id"
    },
    {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => { 
           
            const statusObject = STATUSES.find(status => status.name == value);
            return statusObject ? statusObject.name : 'Неизвестный статус';
        }
        
    },
    /*{
        Header: "Операция",
        accessor: "operations",
        Cell: ({ value }) => {
            console.log(value)
            value?.map(operation=>{ 
                operation.name
            }).join(', ') ?? ''
            
        }


    },*/
    {
        Header: "Модератор",
        accessor: "admin",
        Cell: ({ value }) => {
            
            if (value) {
                return value;
            }
            else {
                return "Не определен"
            }
            
        }
    },
    {
        Header: "Дата формирования",
        accessor: "form_date",
        Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM YYYY, HH:mm") }
    },
    {
        Header: "Дата завершения",
        accessor: "finish_date",
        Cell: ({ value }) => { return value? moment(value).locale(ru()).format("D MMMM YYYY, HH:mm"):"не определено" }
    }
]


export const RequestsTable = () => {
    const navigate = useNavigate()
   
    
    const { session_id } = useSid();
    const { is_moderator, auth } = useAuth();
    useEffect(() => {
        auth()
    }, []);
  
    const [requestsData, setRequestsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   /* const [filters, setFilters] = useState({
      startDate: "",
      endDate: "",
      Status: "",
      userName: "",
    });*/
    const {filters, setFilters} = FilterHook();
    const [loadedOnce, setLoadedOnce] = useState(false);

// ...в функции fetchBreachesData добавить setLoadedOnce(true); после успешного получения данных.

    const savedPage = localStorage.getItem('currentPage') || 0;
    const savedPageSize = localStorage.getItem('pageSize') || 5;

    const COLUMNS = useMemo(() => {
        // useMemo to create columns with new 'actions' column conditionally
        const cols = [...staticColumns];
        if (is_moderator) {
          // Append actions column conditionally
          cols.push({
            Header: "Пользователь",
            accessor: "user",
          });

          cols.push({
            Header: "Действия",
            accessor: "actions",
            Cell: ({ row }) => {
                if (row.original.status === 'в работе') {
                    return (
                        <div>
                            <button className="accept-button" onClick={() => handleAccept(row)}>Принять</button>
                            <button className="reject-button" onClick={() => handleReject(row)}>Отклонить</button>
                            <OperationButton text = "Подробнее" onClick={()=>handleRedirect(row)}></OperationButton>

                        </div>
                    );
                }
                else{
                return (                            
                <div>
                <OperationButton text = "Подробнее" onClick={()=>handleRedirect(row)}></OperationButton>
                </div>
                );}
            },
          });
         


        }
        else{
            cols.push({
                Header: "Действия",
                accessor: "actions",
                Cell: ({ row }) => {
         
                    return (                            
                    <div>
                    <OperationButton text = "Подробнее" onClick={()=>handleRedirect(row)}></OperationButton>
                    </div>
                    );
                },
              });
        }
        return cols;
      }, [is_moderator]); 


      useEffect(() => {
        // Function to fetch and set data at a regular interval ONLY if the user is a moderator
        const fetchDataInterval = async () => {
            await fetchRequestsData(filters, session_id, setRequestsData, setError, setLoadedOnce, setIsLoading);
        };
    
        let interval: any;
        
        if (is_moderator) {
            // Call the function for initial data load
            fetchDataInterval();
    
            // Set up the interval to fetch data every 3 seconds, only for moderators
            interval = setInterval(fetchDataInterval, 3000);
        }else{
            fetchRequestsData(filters, session_id, setRequestsData, setError, setLoadedOnce, setIsLoading);
        }
    
        // Clean up interval on component unmount, or when `is_moderator` changes
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [filters, session_id, is_moderator]); // Dependencies array: component will re-run effect if any of these values change
      

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
  
        if (savedPage) gotoPage(Number(savedPage));
        if (savedPageSize) setPageSize(Number(savedPageSize));
    }, []);



    
    const handleAccept = async (row: any) => {
        try {
            const response = await axios(`http://localhost:8000/request/${row.original.id}/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
                data: {"data":{"status": "завершён"}}
            });
    
            // Если запрос успешен, можно добавить логику для обновления таблицы или данных в UI.
            console.log('Accept response:', response);
    
            // Возможно, вам понадобится вызвать refetch для обновления таблицы:
            // queryClient.invalidateQueries('breaches');
            fetchRequestsData(filters, session_id, setRequestsData, setError, setLoadedOnce, setIsLoading);
            return response.data;
            
        } catch (error) {
            console.error('Error accepting breach:', error);
            // Обработайте ошибку, возможно показать сообщение пользователю
        }
    }
    const handleRedirect = async (row: any)=>{
        //console.log(row)
        navigate(`/request/${row.original.id}`)
    }
    const handleReject = async (row: any) => {
        try {
            const response = await axios(`http://localhost:8000/request/${row.original.id}/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': session_id
                },
                data:  {"data":{"status": "отменён"}}
            });
    
            // Если запрос успешен, можно добавить логику для обновления таблицы или данных в UI.
            console.log('Accept response:', response);
    
            // Возможно, вам понадобится вызвать refetch для обновления таблицы:
            // queryClient.invalidateQueries('breaches');
            fetchRequestsData(filters, session_id, setRequestsData, setError, setLoadedOnce, setIsLoading);
            return response.data;
        } catch (error) {
            console.error('Error accepting breach:', error);
            // Обработайте ошибку, возможно показать сообщение пользователю
        }

    }
    const getFilteredData = useCallback(() => {
        if (filters.userName !== "") {
            return requestsData.filter((item) => {
                // Предполагая, что у item есть вложенный объект user и свойство username. 
                // Если это не так, нужно будет адаптировать эту логику к вашей структуре данных.
                return item.user.toLowerCase().includes(filters.userName.toLowerCase());
            });
        }
        return requestsData;
    }, [requestsData, filters.userName]);

    const filteredRequestsData = useMemo(() => {
        return getFilteredData();
    }, [getFilteredData]);

    const tableInstance = useTable(
        {
            columns: COLUMNS,
            data: filteredRequestsData,//requestsData, // Use the fetched data here
            initialState: { 
              pageIndex: parseInt(savedPage), 
              pageSize: parseInt(savedPageSize) 
            },
        },
        usePagination
    );

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance

    // Сохраняем текущую страницу в localStorage
    React.useEffect(() => {
        localStorage.setItem('currentPage', pageIndex.toString());
    }, [pageIndex]);
    

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        const savedPageSize = localStorage.getItem('pageSize');
    
        const parsedPage = savedPage ? Number(savedPage) : 0;
        const parsedPageSize = savedPageSize ? Number(savedPageSize) : 5;
    
        gotoPage(parsedPage);
        setPageSize(parsedPageSize);
    }, [gotoPage, setPageSize]);
    
  
  

    if (error) return <p>Error</p>;
    if (!loadedOnce && isLoading) return <p>Loading...</p>;


    const handleDateChange = (event: any) => {
        const { name, value } = event.target;
    
        let formattedValue = value;
        if (value) {
            console.log(value)
            formattedValue = moment(value).format("YYYY-MM-DD"); // Обратите внимание на изменение формата
        }
    
        setFilters({
            ...filters,
            [name]: formattedValue
        });
        console.log("in handle date change")
    
    };

    const handleStatusChange = (event: any) => {
        const { name, value } = event.target;
 
        setFilters({
            ...filters,
            [name]: value
        });
    
    };

    const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    

    /*if (filters.userName.length> value.length){
        fetchRequestsData(filters, session_id, setRequestsData, setError, setLoadedOnce, setIsLoading)
    }
    setRequestsData(filter(requestsData, value));*/
    setFilters({
        ...filters,
        [name]: value
    });

};
   /* const filter = (requests: any, searchText: any) => {
        return requests.filter((request: any) => {
            const name = request.user
        //operation.title.toLowerCase();
            const search= searchText.toLowerCase();
            console.log("value_to_search", search, "Name", request.user, " = ", name.includes(search))
            return name.includes(search);

        });
    };
*/

    return (
        <div className="table-wrapper">

            <form> 
            <input
                className="date-input"
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleDateChange}
            />
            <input
                className="date-input"
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleDateChange}
            />

            {is_moderator && 
                <input
                    className="search-input"
                    type="text"
                    placeholder="Поиск по пользователю"
                    name="userName"
                    value={filters.userName}
                    onChange={handleInputChange} // Обновите значение фильтра при изменении поля ввода
                    style = {{
                                marginLeft:'10px',
                                border:'1px solid #ced4da',
                                borderRadius: '4px',
                                fontSize: '16px',
                                color: '#495057', height:'30px'
                            }}
                />
            }



            <select
                className="status-select"
                name="Status"
                value={filters.Status}
                onChange={handleStatusChange}
            >
                  <option value="">Все</option>
                  {STATUSES.map((status: any) => (
                      <option key={status.id} value={status.name}>
                          {status.name}
                      </option>
                  ))}
              </select>
            </form>




            <table {...getTableProps()} className="orders-table">
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map( (column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.column.id === 'id' ? i + 1 : cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Страница{' '}
                    <strong>
                        {pageIndex + 1} из {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    className="status-select"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Показать {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        
    )
}