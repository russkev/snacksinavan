import React from "react";
import useVanUser from "../hooks/useVanUser";
import { Snackbar, handleShowSnackbar } from "../components/snackbar";
import Loading from "../components/loading";
import VanLocation from "../components/van/van.location";
import VanLocationDescription from "../components/van/van.location.description";
import VanStoreStatus from "../components/van/van.store.status";
import VanLogout from "../components/van/van.logout";
import useVanMyVan from "../hooks/useVanMyVan";
import VanSubmitChanges from "../components/van/van.submit.changes";

export default function VanMyVan() {
  const { vanName } = useVanUser();

  const { loading, snackMessage, isSuccess } = useVanMyVan();

  return (
    <>
      <div className="my-van-background">
        <div className="my-van-card">
          <h5 className="my-van-heading">{vanName}</h5>
          <div className="my-van-section-container">
            <div className="flex-column">
              <VanLocation />
              <VanLocationDescription />
              <div className="vertical-gap-small" />
              <VanSubmitChanges showSnackbar={handleShowSnackbar} />
            </div>
            <div className="my-van-switches-container">
              <VanStoreStatus />
              <div className="vertical-gap-medium" />
              <VanLogout />
            </div>
          </div>
        </div>
      </div>
      <Snackbar message={snackMessage} isSuccess={isSuccess} />
      <Loading isLoading={loading} />
    </>
  );
}
