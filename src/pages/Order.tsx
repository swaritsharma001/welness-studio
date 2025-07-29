import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  Download,
  Star,
  MessageSquare
} from 'lucide-react';
import cookie from "js-cookie"

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-500';
    case 'shipped': return 'bg-blue-500';
    case 'processing': return 'bg-yellow-500';
    case 'cancelled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-green-500';
    case 'pending': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return <CheckCircle className="h-4 w-4" />;
    case 'shipped': return <Truck className="h-4 w-4" />;
    case 'processing': return <Package className="h-4 w-4" />;
    case 'cancelled': return <Clock className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const Orders = () => {
  const token = cookie.get("token")
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseURL}/api/store/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setOrders(response.data.orders || []);
        setError(null);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ];

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => (activeTab === 'all' ? true : order.status === activeTab));

  // Calculate total price from backend products info (assumes productId.price and quantity)
  const getOrderTotal = (order: any) => {
    return order.products.reduce((sum: number, p: any) => {
      return sum + (p.productId?.price || 0) * p.quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground mt-1">Track and manage your orders</p>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="relative"
              >
                {tab.label}
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Loading/Error */}
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Orders list */}
      <div className="space-y-4">
        {!loading && filteredOrders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'all' 
                  ? "You haven't placed any orders yet." 
                  : `No ${activeTab} orders found.`}
              </p>
              <Button>Start Shopping</Button>
            </CardContent>
          </Card>
        )}

        {filteredOrders.map(order => (
          <Card key={order._id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Order #{order._id.slice(-8)}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      Placed on {new Date(order.createdAt || order.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </Badge>
                    <Badge className={`${getPaymentStatusColor(order.paymentStatus || 'paid')} text-white`}>
                      <CreditCard className="h-3 w-3 mr-1" />
                      {(order.paymentStatus || 'Paid').charAt(0).toUpperCase() + (order.paymentStatus || 'Paid').slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">AED {getOrderTotal(order).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {order.products.map(({ productId, quantity }: any) => (
                  <div key={productId._id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                    <img
                      src={productId.image || '/src/assets/yoga-products.jpg'}
                      alt={productId.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{productId.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">AED {productId.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracking Information */}
              {/* Adjust if backend tracking info available */}
              {order.tracking && (
                <div className="space-y-4 mb-6">
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Order Tracking
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium text-foreground">{order.tracking.currentStatus}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress:</span>
                          <span className="font-medium text-foreground">{order.tracking.progress}%</span>
                        </div>
                        <Progress value={order.tracking.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tracking Number:</span>
                        <span className="font-mono text-foreground">{order.tracking.trackingNumber}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {order.tracking.actualDelivery ? 'Delivered:' : 'Estimated Delivery:'}
                        </span>
                        <span className="font-medium text-foreground">
                          {new Date(order.tracking.actualDelivery || order.tracking.estimatedDelivery).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              {order.address && order.address.length > 0 && (
                <div className="space-y-4 mb-6">
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p className="font-medium text-foreground">{order.shippingName || 'Recipient'}</p>
                      <p>{order.address[0].street}</p>
                      <p>{order.address[0].city}, {order.address[0].state} - {order.address[0].pincode}</p>
                      <p className="flex items-center gap-1 mt-2">
                        <Phone className="h-3 w-3" />
                        {order.shippingPhone || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
