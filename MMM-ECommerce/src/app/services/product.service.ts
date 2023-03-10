import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8087/api/products';

  private categoryUrl = 'http://localhost:8087/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProduct>{
       
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);  
  
  }


  getProductList(theCategoryId: number): Observable<Product[]>{
       
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  
  }

  searchProducts(theKeyword: string) : Observable<Product[]> {
      
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    console.log(`URL executed=${searchUrl}`);
    return this.getProducts(searchUrl);
  }
   

  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword: string): Observable<GetResponseProduct>{

    // need to build url based on keyword , page and size                          
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);  

  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
      
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );  
  }

  getProduct(theProductId: number): Observable<Product> {
    
     const productUrl =  `${this.baseUrl}/${theProductId}`;
     return this.httpClient.get<Product>(productUrl);
     
  }


}


interface GetResponseProduct {  
  
  _embedded:{
     products: Product[];
  },
  page : {
     size: number,
     totalElements: number,
     totalPages: number,
     number: number
  }
  
}


interface GetResponseProductCategory{  
  
  _embedded:{
     productCategory: ProductCategory[];
  }
  
}

