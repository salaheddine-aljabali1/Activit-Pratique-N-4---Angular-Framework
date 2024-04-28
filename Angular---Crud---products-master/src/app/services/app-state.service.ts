import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState:any ={
    products:  [],
    keyword:   "",
    totalPages: 0,
    pagesSize:  3,
    currentPage:1,
    totalProducts:0,
    status : "",
    errorMessage : ""
  }
public authState : any={
    isAuthenticate : false,
    username : undefined,
    roles : undefined,
    token : undefined
}
  constructor() { }

  public setProductState(state:any):void{
    this.productState={...this.productState, ...state}
  }
  public setAuthState(state : any):void{
    this.authState = {...this.authState, ...state};
  }
}
