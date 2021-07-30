import { useContext, useEffect } from "react";
import { defaultLocation } from "../contexts/van.user.context";
import { VanMyVanContext } from "../contexts/van.my.van.context";
import useVanUser from "../hooks/useVanUser";

export default function useVanMyVan() {
  const {
    locationIsChanged,
    setLocationIsChanged,
    loading,
    setLoading,
    snackMessage,
    setSnackMessage,
    currentDescription,
    setCurrentDescription,
    isSuccess,
    setIsSuccess,
    currentLocation,
    setCurrentLocation,
  } = useContext(VanMyVanContext);

  const { vanIsAuthenticated, vanDetails, updateVan, resetVanDetails } = useVanUser();

  /**
   * Location
   * ----------------------------------------------------------------------------------------------
   */

  // If location is not default location and is different to stored van location
  useEffect(() => {
    if (
      !locationIsChanged &&
      (currentLocation.lat !== defaultLocation.lat || currentLocation.lng !== defaultLocation.lng) &&
      (currentLocation.lat !== vanDetails.latitude || currentLocation.lng !== vanDetails.longitude)
    ) {
      setLocationIsChanged(true);
    }
  }, [currentLocation, locationIsChanged, setLocationIsChanged, vanDetails])

  useEffect(() => {
    if (setCurrentLocation && vanIsAuthenticated) {
      const newLocation = { lat: vanDetails.latitude, lng: vanDetails.longitude };
      setCurrentLocation(newLocation);
    }
  }, [vanIsAuthenticated, vanDetails, setCurrentLocation]);

  const handleMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCurrentLocation(newPosition);
  };

  const onLocationCancel = () => {
    setCurrentLocation({ lat: vanDetails.latitude, lng: vanDetails.longitude });
    setCurrentDescription(vanDetails.locationDescription);
    setLocationIsChanged(false);
  };

  const handleLocationSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    try {
      await updateVan({
        locationDescription: currentDescription,
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
      });
      setIsSuccess(true);
      setSnackMessage("Van location information updated");
      setLocationIsChanged(false);
      setLoading(false);
      return true;
    } catch (error) {
      setIsSuccess(false);
      setSnackMessage(error);
      console.log(error);
      setLoading(false);
      return false;
    }
  };

  /**
   * Location description
   * ----------------------------------------------------------------------------------------------
   */
  useEffect(() => {
    if (vanIsAuthenticated) {
      setCurrentDescription(vanDetails.locationDescription);
    }
  }, [vanIsAuthenticated, vanDetails.locationDescription, setCurrentDescription]);

  useEffect(() => {
    if (
      setLocationIsChanged &&
      !locationIsChanged &&
      currentDescription !== vanDetails.locationDescription &&
      currentDescription !== ""
    ) {
      setLocationIsChanged(true);
    }
  }, [locationIsChanged, currentDescription, vanDetails.locationDescription, setLocationIsChanged]);

  const onDescriptionChange = (event) => {
    setCurrentDescription(event.target.value);
  };

  /**
   * Van ready for orders
   * ----------------------------------------------------------------------------------------------
   */
  const toggleVanReady = async () => {
    setLoading(true);
    updateVan({ readyForOrders: !vanDetails.readyForOrders })
      .then((result) => {
        setLoading(false);
        if (result.readyForOrders) {
          setIsSuccess(true);
          setSnackMessage("Van is now OPEN");
          return;
        } else {
          setIsSuccess(true);
          setSnackMessage("Van is now CLOSED");
          return;
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        setSnackMessage(error);
        return;
      });
  };

  /**
   * Logout
   * ----------------------------------------------------------------------------------------------
   */
  const logoutVan = () => {
    localStorage.setItem("vanToken", "");
    localStorage.setItem("vanName", "");
    setCurrentLocation(defaultLocation);
    setSnackMessage("");
    resetVanDetails();
  };

  return {
    loading,
    snackMessage,
    isSuccess,
    locationIsChanged,
    currentDescription,
    currentLocation,
    setCurrentLocation,
    setCurrentDescription,
    setLocationIsChanged,
    handleMarkerDragEnd,
    onLocationCancel,
    handleLocationSubmit,
    onDescriptionChange,
    toggleVanReady,
    logoutVan,
  };
}
