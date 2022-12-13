import * as internal from "stream";

export class Product {
    title!: string;
    price!: number;
    detail!: string;
    thumbnailImage!:string;
    id!: Number;

    constructor(title: string, price: number, detail: string,
        thumbnailImage:string, id: Number){
            this.title = title;
            this.price = price;
            this.detail = detail;
            this.thumbnailImage = thumbnailImage;
            this.id = id;

    }

}
