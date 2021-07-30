import { useContext } from 'react'
import { SnackContext } from "../contexts/snack.context"



/**
 * Main snacks hook. Provides data manipulation methods for the snacks menu
 */
export default function useSnacks() {
  const { snacks, loading, error } = useContext(SnackContext)

  function snackFromId(snackId) {
    return snacks.find(snack => snack._id === snackId)
  }

  function snackFromName(snackName) {
    return snacks.find(snack => snack.name === snackName)
  }

  return {
    loading,
    snacks,
    error,
    snackFromId,
    snackFromName,
  }
}