interface Operation{
     name: string,
     status: string,
     type: string,
     description: string,
     pk: BigInteger,
     image:string
}

interface Request{
     id: number,
     status: string,
     creation_date: string,
     form_date: string,
     finish_date: string,
     user: string,
     admin: 9
}

interface DraftItem{
   
          id: number,
          operand1: number,
          operand2: number,
          operation:Operation
     
}
interface DraftRequest{
     request:Request,
     items:[DraftItem]
}