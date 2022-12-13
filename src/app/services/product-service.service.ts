import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  json_locatio = '../proizvodi.json';

  constructor(private _httpClient: HttpClient) { }

  private _createProductFromObject(item:any) {
    return new Product(item.title, item.price, item.detail, item.thumbnailImage,item.fullImage);
    }

  public getProducts(): Observable<Product[]>{
    return this._httpClient.get(this.json_locatio).pipe(
      map((data: any[]) => data.map((item: any)=>
      this._createProductFromObject(item))),
    );
  }

  public getProduct(id: Number){
    return this._httpClient.get(this.json_locatio+'/'+id).pipe(
      map((data: any)=> this._createProductFromObject(data)),
    );
  }

  public deleteProduct(id: Number) : Observable<Product>{
    return this._httpClient.delete(this.json_locatio+"/" + id).pipe(
      map((data: any)=> this._createProductFromObject(data)),
    );
  }

  public createProduct(product: Product) : Observable<Product>{
    return this._httpClient.post(this.json_locatio,product).pipe(
      map((data: any) => this._createProductFromObject(data)),
    )
  }
}
