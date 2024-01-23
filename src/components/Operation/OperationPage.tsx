import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./OperationPage.css"
import { GetOperation} from "./GetOperation";
import BreadCrumbs from '../BreadCrumb/BreadCrumb';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyNavBar from '../MyNavBar/NavBar';
interface  Operation {
    data: {
    id: number;
    img_src: string;
    name: string;
    description: string;
    status: string;
    image: string|null;
    };
    image: string;

}

const Operation = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const OperationId = id ? parseInt(id, 10) : null; // Преобразование в число или null

    const [Operation_, setOperation] = useState<Operation | null>(null);

    useEffect(() => {
        if (OperationId !== null) {
            GetOperation(OperationId)
                .then((result:any) => {
                    if (result.data !== null) {
                      if (result.data[0].data !==null){
                       let mockdata = {data:{id: result.data[0].pk, img_src:result.data[0].pk, name:result.data[0].name, description: result.data[0].description, status:result.data[0].status, image: result.data[0].image}, image: result.data[0].image}
                       console.log("MOCKDATA", mockdata)
                       setOperation( mockdata)
                      }
                      else{
                        setOperation(result.data[0]);}
                    }
                })
                .catch((error:any) => {
                    console.error('Error:', error);
                });
        }
    }, [OperationId]);

    if (!Operation_) {
        return <div>Loading...</div>;
    }
    //создаем брэдкрамб
    const location = useLocation();
    let curLink ='';
   let path_list = location.pathname.split('/').filter(crumb=>crumb!=='').map(crumb =>{
    curLink+= '/'+crumb;
    return curLink;
   })
   let name_list = ["Operation", Operation_.data?.name]
    let crumbs={data:[{name:name_list[0], path:path_list[0]},
     {name:name_list[1], path:path_list[1]}]};
   
   console.log("My operation", Operation_)
    return (<>
  
        <main>  
        <MyNavBar></MyNavBar>
        <BreadCrumbs crumbs ={crumbs}></BreadCrumbs>
  <div className="card">
    <div className="card__name">
      <div className="icon">
        <Link to ='/operation'><i className="fa fa-arrow-left"></i></Link>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
      </div>
      
    </div>
    <div className="card__body">
      <div className="half">
        <div className="featured_text">
          <h1>{Operation_.data.name}</h1>
          <p className="sub">Бинарная операция:</p>
        </div>
        <div className="image">
          <img src={"data:image/jpeg;base64,"+Operation_.data?.image} alt=""/>
        </div>
      </div>
      <div className="half">
        <div className="description">
          <p>{Operation_.data.description}</p>
        </div>
        
       
      </div>
    </div>
    <div className="card__footer">
    
      <div className="action">
        <button type="button">Добавить в заявку</button>
      </div>
    </div>
  </div>
</main>
        </>
    );
};

export default Operation;