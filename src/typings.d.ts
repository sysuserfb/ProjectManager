/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

//my define interface
interface Product {
  admin:{
    user_id:number,
    user_name:string
  },
  product_id:number,
  product_name:string,
  version:string,
  platform:string,
  OS:string,
  create_date
}
interface userInfo {
  username:string,
  email:string,
  userId:number
}

