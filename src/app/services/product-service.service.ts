import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../models/product';
import { HttpClientModule } from '@angular/common/http';
import { compileDeclareInjectableFromMetadata, isNgTemplate } from '@angular/compiler';
import { importType } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  json_locatio = 'https://raw.githubusercontent.com/Caaki/iApple/main/src/app/proizvodi.json';
  json_locatio2 = '../proizvodi.json';
  
  constructor(private _httpClient: HttpClient) { }

  private _createProductFromObject(item:any) {
    return new Product(item.title, item.price, item.detail, item.thumbnailImage,item.id);
    }

  public getProducts() : Observable<Product[]>{
    return this._httpClient.get<Product[]>(this.json_locatio).pipe(
      map((data:any[]) => data.map((item :any)=> 
      this._createProductFromObject(item)))
    );
  }

  public getProduct(id: Number){
    return this.getProducts().pipe(
      map(items => items.find(item => item.id === id)));
  }

  public deleteProduct(id: Number) : Observable<Product>{
    return this._httpClient.delete(this.json_locatio+"/" + id).pipe(
      map((data: any)=> this._createProductFromObject(data))
    );
  }

  public createProduct(product: Product) : Observable<Product>{
    return this._httpClient.post(this.json_locatio,product).pipe(
      map((data: any) => this._createProductFromObject(data))
    )
  }


}
