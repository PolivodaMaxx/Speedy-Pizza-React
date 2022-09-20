import { CartItemType } from "../redux/cart/types";

 const calcTotalPrice = (items: CartItemType[]) => {
    return  items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
}

export default calcTotalPrice