import { CartItem } from "@/store/cartSlice";
import Image from "next/image";
import useCart from "@/hooks/useCart";

const CartItems = () => {
    const cart = useCart();
    console.log("CART", cart);
    console.log("ITEM", cart.cart);
  return (
    <div className="grid gap-6">
      {cart.cart.map((item : CartItem) => {
        let productImage = "";
        if (item.productImage && item.productImage.data) {
          const base64Image = Buffer.from(item.productImage.data).toString("base64");
          productImage = `data:image/jpeg;base64,${base64Image}`;
        }

        return (
          <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0">
              <Image
                src={productImage}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
              <div>
                <button className="text-sm text-black bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;