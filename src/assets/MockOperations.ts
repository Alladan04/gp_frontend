import { getimg } from "./img";
const mockOperations = [
    {
        data:{
        pk: 1,
        img_src: "none",
        name: 'Дизъюнкция',
        description: 'Дизъю́нкция, логи́ческое сложе́ние, логи́ческое ИЛИ, включа́ющее ИЛИ; иногда просто ИЛИ — логическая операция, по своему применению максимально приближённая к союзу «или» в смысле «или то, или это, или оба сразу». Дизъюнкция может быть операцией как бинарной, так и n-арной для произвольного n',
        status: 'действует',
       },
       image: getimg(),
       
    },
    {
        data:{
        pk: 2,
        img_src: "none",
        name: 'Конъюнкция',
        description: 'Конъю́нкция — логическая операция, по смыслу максимально приближенная к союзу «и». Синонимы: логи́ческое «И», логи́ческое умноже́ние, иногда просто «И». Конъюнкция может быть бинарной операцией, тернарной операцией, или n-арной операцией.',
        status: 'действует',
       },
       image: getimg(),
       
    },
    {
        data:{
        pk: 3,
        img_src: "none",
        name: 'Отрицание',
        description: 'Отрица́ние в логике — унарная операция над суждениями, результатом которой является суждение, «противоположное» исходному. Обозначается знаком ¬ перед или чертой — над суждением. ',
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
export const getMockOperation = (pk:number) :Operation =>{
    for (let i = 0; i < mockOperations.length; i++) {
        if (mockOperations[i]['data']['pk'] == pk){
            let myoperation = {id:mockOperations[i]['data']['pk'], 
                                img_src:mockOperations[i]['data']['img_src'],
                            image:mockOperations[i]['image'],
                        name: mockOperations[i]['data']['name'],
                    description:mockOperations[i]['data']['description'],
                status: mockOperations[i]['data']['status'] }

            //myoperation['data']['image'] = myoperation['image']
            return myoperation//{operation: mockOperations[i]};
        }
      } 
      let myoperation = {id:mockOperations[1]['data']['pk'], 
                                img_src:mockOperations[1]['data']['img_src'],
                            image:mockOperations[1]['image'],
                        name: mockOperations[1]['data']['name'],
                    description:mockOperations[1]['data']['description'],
                status: mockOperations[1]['data']['status'] }

            //myoperation['data']['image'] = myoperation['image']
            return myoperation//{operation: mockOperations[i]}
}

export const getFilteredMocks=(titleData:string)=>{
    let mocks = getMockOperations()
    mocks.operations = mocks.operations.filter(number => number.data.name.includes(titleData.toLowerCase()));
    return mocks

}