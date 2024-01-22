//import{useLocation} from "react-router-dom"
import { Link } from "react-router-dom";
import "./BreadCrumb.css"

export interface Crumbs {
    data:{
     name:string;
     path:string;
    }[]
    
   }
const BreadCrumbs: React.FC<{crumbs:Crumbs}> = ({crumbs}) => {
    // const location = useLocation();
     ///let currentLink = '';
     //console.log(location);
    // const crumbs = location.pathname.split('/')
    // .filter(crumb=>crumb!=='')
     const data = crumbs.data
     .map(crumb => {
         // currentLink +=`/${crumb}`;
          return (
               <div className = "crumb" key = {crumb.name} style = {{marginTop:"10%"}}>
                    <Link to = {crumb.path}>{crumb.name}</Link>
               </div>
          )
     })
     return (
          <div className="breadcrumb">
               {data}
          </div>
     )
}
export default BreadCrumbs