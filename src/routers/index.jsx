import React, { Suspense, lazy, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import routerConfig from "./config";
import Layout from "@/components/layout";
import Loading from "@/components/layout";

const loopRouter = (arr) => {
  return arr.map((x) => {
    const RouteCom = lazy(() => import(`../views/${x.component}`));
    const { isDefaultLayout = true } = x;
    return (
      <Route
        key={x.path}
        exact
        path={x.path}
        element={
          isDefaultLayout ? (
            <Layout>
              <RouteCom />
            </Layout>
          ) : (
            <RouteCom />
          )
        }
      />
    );
  });
};

export default () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          {loopRouter(routerConfig)}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
