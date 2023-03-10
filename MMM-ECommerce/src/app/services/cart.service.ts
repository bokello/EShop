import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  
  constructor() { }



  addToCart(theCartItem: CartItem)
  {

     // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem : CartItem | undefined;

     if(this.cartItems.length > 0)
     {
        // find the item in the cart based on item id

        for(let tempCartItem of this.cartItems)
        {
          if(tempCartItem.id === theCartItem.id){
            existingCartItem = tempCartItem;
            existingCartItem.quantity++;

            break;
          }
        }

       // check if we found it
       alreadyExistsInCart = (existingCartItem != undefined);

      }

      if(!alreadyExistsInCart)
      {
          this.cartItems.push(theCartItem);
      }

      // compute cart total price and total quantity

      this.computeCartTotals();

    
     
  }

  computeCartTotals() {
     
      let totalPriceValue : number = 0;
      let totalQuantityValue: number = 0;

      for(let currentCartItem of this.cartItems)
      {
         totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
         totalQuantityValue += currentCartItem.quantity;
      }

      // publish the new values to all subscribers

      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      // log cart data for debugging
      this.logCartData(totalPriceValue, totalQuantityValue);

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
  
      console.log(`contents of the cart`);

      for(let tempCartItem of this.cartItems)
      {
         const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
         console.log(`name= ${tempCartItem.name} quantity= ${tempCartItem.quantity} unitPrice= ${tempCartItem.unitPrice}  subTotalPrice ${subTotalPrice} `);
      }

     console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
     console.log(`-------------------------------`);
  }

}
