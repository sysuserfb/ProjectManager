/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

//my define interface
interface Product {
  product_id:number,
  product_name:string,
  platform:string,
  OS:string,
  create_date
}
interface userInfo {
  username:string,
  email:string,
  userId:number
}

