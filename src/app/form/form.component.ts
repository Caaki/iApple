import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throws } from 'assert';
import { Product } from '../models/product';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public productForm!: FormGroup;
  public products!: Product[];

  constructor(private _productService: ProductServiceService) { 
    this._productService.getProducts().subscribe((data)=>{
      this.products = data;
    
  })

    this.initForm();

  }
  ngOnInit(): void {
    
  
  }

  public initForm(){
    this.productForm = new FormGroup({
      title: new FormControl('',[
        Validators.required
      ]),
      price: new FormControl('',[
        Validators.required
      ]),
      detail: new FormControl('',[
        Validators.required
      ]),
      id: new FormControl('',[
        Validators.required
      ])
    });
  }


  public submitForm(){
    let title = this.productForm.get('title')!.value;
    let price = this.productForm.get('price')!.value;
    let detail = this.productForm.get('detail')!.value;
    let thumbnailImage = this.productForm.get('thumbnailImage')!.value;
    let id = this.productForm.get('id')!.value;

    let product = new Product(title,price,detail,thumbnailImage,id);

    this.createProduct(product);
  }

  public getProduct(id: Number){
    this._productService.getProduct(id).subscribe((data)=>{
      alert(JSON.stringify(data));
    })

  }


  public createProduct(product: Product){
    this._productService.createProduct(product).subscribe((data)=>
    this.products?.unshift(data));
  }


  public deleteProduct(id: Number){
    this._productService.deleteProduct(id).subscribe((data)=>{
      this._removeProductFromList(id);
      alert("Obrisan je product sa id-em: "+ id);
    })
  }
  

  private _removeProductFromList(id: Number){
    let ind = this.products.findIndex(product => product.id == id);
    this.products.splice(ind,1);
  }

}
