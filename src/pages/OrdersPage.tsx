import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { Badge } from "../components/ui/badge";
import { Eye, Package, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const OrdersPage: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "2024-03-15",
      status: "delivered",
      total: 8500,
      items: [
        {
          id: "1",
          name: "Organic Maize Seeds",
          quantity: 2,
          price: 2500,
          image: "/products/maize.jpg"
        },
        {
          id: "2",
          name: "Premium Fertilizer",
          quantity: 1,
          price: 3500,
          image: "/products/fertilizer.jpg"
        }
      ]
    },
    {
      id: "ORD-002",
      date: "2024-03-14",
      status: "processing",
      total: 4500,
      items: [
        {
          id: "3",
          name: "Garden Tools Set",
          quantity: 1,
          price: 4500,
          image: "/products/tools.jpg"
        }
      ]
    }
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Package className="w-3 h-3" />;
      case "processing":
        return <AlertCircle className="w-3 h-3" />;
      case "shipped":
        return <Truck className="w-3 h-3" />;
      case "delivered":
        return <CheckCircle2 className="w-3 h-3" />;
      case "cancelled":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-base font-semibold text-gray-900 mb-2">My Orders</h1>

      <div className="space-y-2">
        {orders.map((order) => (
          <Card key={order.id} className="border border-gray-100 shadow-none">
            <CardContent className="p-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">Order {order.id}</h3>
                    <Badge className={getStatusColor(order.status) + ' px-2 py-0.5 text-xs font-normal'}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString('sw-TZ')}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Total: {formatCurrency(order.total)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewOrderDetails(order)}
                    className="flex items-center gap-1 text-xs font-normal px-2 py-1 h-7"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 z-50">
          <Card className="w-full max-w-md border border-gray-100 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Order {selectedOrder.id}</h2>
                  <p className="text-xs text-gray-500">
                    Placed on {new Date(selectedOrder.date).toLocaleDateString('sw-TZ')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 h-7 w-7"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-3">
                <div className="border-t pt-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded border border-gray-100"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.quantity * item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-gray-900">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 