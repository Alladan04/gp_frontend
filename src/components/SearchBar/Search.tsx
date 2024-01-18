import {Dispatch} from "react";
import "./Search.css"


const SearchOperations = ({ title, setTitle, setSubmitData}: {title:string, setTitle: Dispatch<string>, setSubmitData: Dispatch<string>}) => {

   /* const handleChange = (value: string) => {
        setShowData(value)
       
    }*/

    const handleFilterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //settitleData(event.currentTarget.firstChild?.value);  // document.getElementById("search_text").innerHTML;
    //settitleData((event.currentTarget[0] as HTMLInputElement).value);
    setSubmitData((event.currentTarget[0] as HTMLInputElement).value);
    console.log("SUBMIT", (event.currentTarget[0] as HTMLInputElement).value)
    };
    
    const handleChange = (value: string)=>{
        setTitle(value)
    }

    return (
<>
<div className="box" style = {{marginTop:'20px'}}>
  <form id = 'search'name="search" method = "get" onSubmit={(e)=>handleFilterSubmit(e)} >
      <input id= "search_text" type="text" className="input" name="text" value = {title} 
      onChange={(e)=>handleChange(e.target.value)}  />
  </form>
  <i className="fas fa-search"></i>

</div>
    
</>
    )
}

export default SearchOperations;