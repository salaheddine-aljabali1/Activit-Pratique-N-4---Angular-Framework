import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { Product } from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(private productService: ProductService,
              private router : Router,
              public appState: AppStateService) {
  }

  ngOnInit() {
    this.searchProduct();
  }

  searchProduct() {
/*
      this.appState.setProductState({
        status:"LOADING"
      });
*/
    this.productService.searchProduct(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pagesSize)
      .subscribe({
        next: resp => {
        let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          //this.appState.productState.totalProducts=totalProducts;
          //this.totalPages = Math.floor(  totalProducts/this.pagesSize );
          console.log(this.appState.productState.totalPages);
          if(totalProducts % this.appState.productState.pagesSize !=0 ){
            ++this.appState.productState.totalPages;
          }
          this.appState.setProductState({
            products :products,
            totalProducts :totalProducts,
            totalPages : this.appState.productState.totalPages,
            status:"LOADED"
          })
        },
        error: err => {
          this.appState.setProductState({
            status:"ERROR",
            errorMessage :err
          })
        }
      })

    //this.products=this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
        //this.getProducts();
      }
    })
  }

  handleDelete(product: Product) {
    if (confirm("Etes vous sûre?"))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          //this.getProducts();
        /*  this.appState.productState.products =
            this.appState.productState.products.filter
            ((p:any) => p.id != product.id);*/
          this.searchProduct();
        }
      })
  }

  /*searchProducts() {
    this.currentPage=1;
    this.totalPages=0;
    this.productService.getProducts(this.keyword, this.currentPage,this.pagesSize).subscribe({
      next: value => {
        this.products = value;
      }
    })
  }
*/
  handleGotoPage(page : number) {
    this.appState.productState.currentPage=page;
    this.searchProduct();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)

  }
}
