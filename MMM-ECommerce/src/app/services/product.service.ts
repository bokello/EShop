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

  getProductList(theCategoryId: number): Observable<Product[]>{
      
    // @TODO: need to update URL for the service based on categoryId

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
        map(response => response._embedded.products)
      );
  }

  getProductCategories(): Observable<ProductCategory[]> {
      
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  
  }

}


interface GetResponseProduct{  
  
  _embedded:{
     products: Product[];
  }
  
}


interface GetResponseProductCategory{  
  
  _embedded:{
     productCategory: ProductCategory[];
  }
  
}

