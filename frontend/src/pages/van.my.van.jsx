import React from "react";
import useVanUser from "../hooks/useVanUser";
import VanLocation from "../components/van/van.location";
import VanLocationDescription from "../components/van/van.location.description";
import VanStoreStatus from "../components/van/van.store.status";
import VanLogout from "../components/van/van.logout";
import useVanMyVan from "../hooks/useVanMyVan";
import VanSubmitChanges from "../components/van/van.submit.changes";
import "../styling/van.my.van.css";
import LoadingLogo from "../components/loading.logo";

export default function VanMyVan() {
  const { vanName } = useVanUser();

  const { loading } = useVanMyVan();

  return (
    <>
      <div className="my-van van-bg">
        <div className="van-container">
          <h4>Van name</h4>
          <h1>{vanName}</h1>
          <article>
            <section className="status">
              <VanStoreStatus />
              <VanLogout />
            </section>
            <section className="location">
              <VanLocation />
              <VanLocationDescription />
              <VanSubmitChanges />
            </section>
          </article>
        </div>
      </div>
      <LoadingLogo isLoading={loading} isTransparent />
    </>
  );
}
