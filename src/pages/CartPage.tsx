import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

const CartPage: React.FC = () => {
  const { translations } = useLanguage();

  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Organic Maize Seeds",
      price: 2500,
      quantity: 2,
      image: "/products/maize.jpg",
      unit: "kg"
    },
    {
      id: "2",
      name: "Premium Fertilizer",
      price: 3500,
      quantity: 1,
      image: "/products/fertilizer.jpg",
      unit: "bag"
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 500; // Fixed shipping cost
  const total = subtotal + shipping;

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // Implement checkout logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base font-semibold text-gray-900">{translations.cart}</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-xs px-3 h-8"
          onClick={() => window.history.back()}
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-2">
          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500 text-sm">
                Your cart is empty
              </CardContent>
            </Card>
          ) :
            cartItems.map(item => (
              <Card key={item.id} className="border border-gray-100 shadow-none">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border border-gray-100"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 h-7 w-7"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.price.toLocaleString()} KES per {item.unit}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-7 w-7"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-7 w-7"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>

        {/* Order Summary */}
        <Card className="lg:col-span-1 h-fit border border-gray-100 shadow-none">
          <CardContent className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} KES</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Shipping</span>
                <span>{shipping.toLocaleString()} KES</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between text-sm font-semibold text-gray-900">
                <span>Total</span>
                <span>{total.toLocaleString()} KES</span>
              </div>
            </div>
            <Button
              className="w-full mt-2 text-sm h-9"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage; 