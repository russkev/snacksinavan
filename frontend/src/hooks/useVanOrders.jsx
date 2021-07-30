import { useContext } from "react"
import { VanOrdersContext } from "../contexts/van.orders.context"

export default function useVanOrders() {
  const {
    vanOrders,
    setVanOrders,
    vanSocket,
    connectVanSocket,
  } = useContext(VanOrdersContext);



  return {
    vanOrders,
    setVanOrders,
    vanSocket,
    connectVanSocket,
  }
}
