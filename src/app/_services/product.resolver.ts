import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../_models/product";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";

@Injectable()
export class ProductResolver implements Resolve<Product> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        return this.productService.getById(route.params['_id']);
    }

}