interface Operation{
     name: string,
     status: string,
     type: string,
     description: string,
     pk: BigInteger,
     image:string
}

interface Request{
     id: BigInteger,
     status: string,
     creation_date: string,
     form_date: string,
     finish_date: string,
     user: string,
     admin: 9
}