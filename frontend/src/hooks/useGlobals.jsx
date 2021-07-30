import { useContext } from "react"
import { GlobalsContext } from "../contexts/globals.context";

export default function useGlobals() {
  const {globals} = useContext(GlobalsContext)

  return {
    globals
  }
}