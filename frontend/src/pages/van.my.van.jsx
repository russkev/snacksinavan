import React from "react";
import useVanUser from "../hooks/useVanUser";
import { LoadScript } from "@react-google-maps/api";
import { Snackbar, handleShowSnackbar } from "../components/snackbar";
import Loading from "../components/loading";
import VanLocation from "../components/van/van.location";
import VanLocationDescription from "../components/van/van.location.description";
import VanStoreStatus from "../components/van/van.store.status";
import VanLogout from "../components/van/van.logout";
import useVanMyVan from "../hooks/useVanMyVan";
import VanSubmitChanges from "../components/van/van.submit.changes";
import "../styling/van.my.van.css"
const lib = ["places"];

export default function VanMyVan() {
  const { vanName } = useVanUser();

  const { loading, snackMessage, isSuccess } = useVanMyVan();

  return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY} libraries={lib}>
      <div className="my-van">
        <div className="van-container" >
          <h1>
            {vanName}
          </h1>
          <article>
            <section className="status">
              <VanStoreStatus />
              <VanLogout />
            </section>
            <section className="location">
              <VanLocation />
              <VanLocationDescription />
              <VanSubmitChanges showSnackbar={handleShowSnackbar}/>
            </section>
          </article>
        </div>
      </div>
      <Snackbar message={snackMessage} isSuccess={isSuccess} />
      <Loading isLoading={loading} />
    </LoadScript>
  );
}
