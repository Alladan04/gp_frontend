import defaultImage from './Default.png';
import { getMockOperations, getFilteredMocks} from '../../assets/MockOperations.ts';



export interface Operation {
     pk: number;
     img_src: string;
     image: string;
     name: string;
     description: string;
     status: string;
    
 }
export interface OpRes {
    data:Operation[];
    
    request_id: number | null;
}

export const GetFilteredOps = async (titleData: string): Promise<OpRes> => {
    const mockOperations = getFilteredMocks(titleData);//getMockOperations();
    console.log("mock operation", mockOperations);
    try {
        const params = new URLSearchParams({
            text: titleData,
        });

        let url = '';
        if(titleData == null&&titleData==''&&titleData==' '){
            url = `http://127.0.0.1:8000/operation/`;
        } else{
            url = `http://127.0.0.1:8000/operation/?${params}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
            return {
                request_id: null,
                // @ts-ignore
                operations: mockOperations.operations
            }
        }

        const List: OpRes = await response.json();
        const Operations = List.data;

        if (Array.isArray(Operations)) {
            Operations.forEach(item => {
                if (!item.image) {
                    item.image = defaultImage;
                }
            });
        }

        return {
            request_id: List.request_id,   
            data: Operations,
        };
    } catch (error) {
        console.log("catched an error");
        return {
            request_id: null,
            // @ts-ignore
            data: mockOperations.operations
        }
    }
};