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
  user_name:string,
  email:string,
  user_id:number
}

interface detail{
  admin:userInfo,
  dev_mem:Array<userInfo>,
  test_mem:Array<userInfo>,
  version_cur,
  version_dev,
  product_id:number,
  product_name:string,
  platform:string,
  OS:string
}
