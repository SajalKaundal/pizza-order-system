import { connectDB } from "@/db/db";
import { verifyAuth } from "./auth";
import Order from "@/db/models/Order";
export default async function fetchOrder(){
  await connectDB()
  const user = await verifyAuth();
  
  try{
    const orders = await Order.find({
      user:user?.id
    })
    return orders
  }catch{
    return []
  }
}