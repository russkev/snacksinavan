import { useContext } from "react"
import { VanOrdersContext } from "../contexts/van.orders.context"

export default function useVanOrders() {
  const {
    vanOrders,
    vanSocket,
    connectVanSocket,
  } = useContext(VanOrdersContext);



  return {
    vanOrders,
    vanSocket,
    connectVanSocket,
  }
}
