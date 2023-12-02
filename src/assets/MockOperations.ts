//import defaultImage from './Default.svg';

const mockOperations = [
    {
        data:{
        id: 1,
        img_src: "none",
        name: 'пример операции 1',
        description: 'лололололо',
        status: 'действует',
       },
       image: "https://www.flaticon.com/ru/free-icon/no-photo_4054617",
       
    },
    {
        data:{
        id: 2,
        img_src: "none",
        name: 'пример операции 2',
        description: 'лололололо',
        status: 'действует',
       },
       image: "https://www.flaticon.com/ru/free-icon/no-photo_4054617",
       
    },
    {
        data:{
        id: 3,
        img_src: "none",
        name: 'пример операции 3',
        description: 'лололололо',
        status: 'действует',
       },
       image: "https://www.flaticon.com/ru/free-icon/no-photo_4054617",
       
    }
]


export const getMockOperations = () => {
    return {
        operations: mockOperations,
    };
};