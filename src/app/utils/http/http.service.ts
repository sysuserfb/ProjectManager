import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* 主机地址，后面要加上'/api/' localhost时可简写为'api/' */
const mockUrl="http://mock.eolinker.com/d3kKQHC3ca5e5847b3e31decedbede583d6179de32f8892?uri=";
const localUrl="";
const localtest="http://localhost:3000/";
const HostName = localtest;
@Injectable()
export class HttpService {

  // private token;
  constructor(private http: Http) {
    // this.token = localStorage.getItem("token");
  }
  /**
   * 构造post请求体
   * @param object 参数对象
   */
  public getFormData(object: object): URLSearchParams {
    let formData = new URLSearchParams();
    for (let key in object) {
      formData.append(key, object[key]);
    }
    return formData;
  }
  /**
   * 新建http请求头
   * 包含了公共的token
   */
  public myHead(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('X-Access-Token', this.token);
    return headers;
  }
  /**
   * http post 请求方法
   * @param Api 访问的api地址
   * @param Params 参数对象
   * @return Observable<any> 可观察对象
   */
  public post(Api: string, Params: object): Observable<any> {
    let data = this.getFormData(Params);
    let headers = this.myHead();
    let url = HostName + Api;

    return this.http.post(url, data, { headers: headers }).map((res: Response) => {
      let data = res.json();
      // 当result为0，返回成功
      if (data.result === 0) {
        return data;
      }
      else {
        throw (data.msg);
      }
    });
  }
  public postForm(Api:string,data:FormData):Observable<any>{
    let headers = new Headers();
    let url = HostName + Api;
    return this.http.post(url,data,{headers:headers}).map((res)=>{
      let data = res.json();
      // 当result为0，返回成功
      if (data.result === 0) {
        return data;
      }
      else {
        throw (data.msg);
      }
    })
  }

  /**
   * http get方法
   * @param Api 访问的api地址
   * @param Params 参数对象，可为空
   * @return Observable<any> 可观察对象
   */
  public get(Api: string, Params: object = null): Observable<any> {

    let headers = this.myHead();
    let url = HostName + Api;
    return this.http.get(url, { params: Params, headers: headers }).map((res: Response) => {
      let data = res.json();
      // 当result为0，返回成功
      if (data.result === 0) {
        return data;
      }
      else {
        throw (data.msg);
      }
    });
  }
}
