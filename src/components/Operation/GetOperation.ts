
import { getMockOperation} from '../../assets/MockOperations.ts';
export interface Operation {
     //id = models.IntegerField(primary_key=True)
    //name = models.CharField(max_length=30, blank=True, null=True)
    //status = models.CharField(max_length =30, blank=True, null=True)  # This field type is a guess.
    //type = models.CharField(max_length = 30, blank=True, null=True)  # This field type is a guess.
    //#price = models.FloatField(blank=True, null=True)  # This field type is a guess.
    ///description = models.TextField(blank=True, null=True)
    //img_src = models.CharField(max_length=200, blank = True, null = True)
     id: number;
     img_src: string;
     image: string;
     name: string;
     description: string;
     status: string;
    
 }
 
 export interface OpRes {
     data: Operation[] | null;
 }
 
 export const GetOperation= async (id: number): Promise<OpRes> => {
    const mockOperation =getMockOperation(id) ;
     try {
         const response = await fetch(`http://127.0.0.1:8000/operation/${id}/`);
         if (!response.ok) {
            // throw new Error('Запрос незадался!');
            console.log("mockOperation getoperation", mockOperation)
             return{
               data: [mockOperation]
         }
        }
         const data: Operation = await response.json();
         //console.log("OUR DATA", data);
         return {
           
            data: [data],
         };
     } catch (error) {
         //console.error('Ошибка запроса:', error);
         console.log("mockOperation getoperation catch", mockOperation)
         return {
             data: [mockOperation],
         };
     }
 };