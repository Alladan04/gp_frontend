import {useEffect, useState} from 'react'
import {GetFilteredOps, OpRes} from './GetOperations.ts'
// import "../styles/search_button.css"
// import {setGeographicalObjectData} from "../components/Main.tsx"


function SearchOperations({
    setOperationData,
    setTitleData,
}: {
setOperationData: (data: OpRes) => void;
setTitleData: (data: any) => void;
}) {
// Для фильтрации услуг
const [titleData, settitleData] = useState<string>('');
const [submitData, setSubmitData] = useState<string>('');
const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
   settitleData(event.target.value);
};


const handleFilterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();
//settitleData(event.currentTarget.firstChild?.value);  // document.getElementById("search_text").innerHTML;
//settitleData((event.currentTarget[0] as HTMLInputElement).value);
setSubmitData((event.currentTarget[0] as HTMLInputElement).value);
console.log("SUBMIT", (event.currentTarget[0] as HTMLInputElement).value)
};



useEffect(() => {
// Функция, которая будет выполнять фильтрацию данных
const fetchTitledData = async () => {
try {
const response = await GetFilteredOps(titleData);
setOperationData(response);
setTitleData(titleData);
} catch (error) {
console.error('Error filtering fines:', error);
}
};
// Вызываем фильтрацию данных при изменении filterKeyword
fetchTitledData();
// Этот useEffect будет выполнен при изменении filterKeyword или currentPage
}, [submitData]);



return (
<>
<div className="box">
  <form id = 'search'name="search" method = "get" onSubmit={handleFilterSubmit}>
      <input id= "search_text" type="text" className="input" name="text" value = {titleData} 
      onChange={handleFilterChange}/>
  </form>
  <i className="fas fa-search"></i>

</div>
</>
);
};

export default SearchOperations;