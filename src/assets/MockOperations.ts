import { getimg } from "./img";
const mockOperations = [
    {
        data:{
        id: 1,
        img_src: "none",
        name: 'пример операции 1',
        description: 'лололололо',
        status: 'действует',
       },
       image: getimg(),
       
    },
    {
        data:{
        id: 2,
        img_src: "none",
        name: 'пример операции 2',
        description: 'лололололо',
        status: 'действует',
       },
       image: getimg(),
       
    },
    {
        data:{
        id: 3,
        img_src: "none",
        name: 'пример операции 3',
        description: 'лололололо',
        status: 'действует',
       },
       image: getimg(),
       
    }
]


export const getMockOperations = () => {
    return {
        operations: mockOperations,
    };
};