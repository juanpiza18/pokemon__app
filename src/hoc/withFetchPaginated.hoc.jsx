import React, { useEffect, useState } from "react";
import Spinner from "../components/spinner/spinner.component";

const WithFetch =
  (WrappedComponent, contextProvider) =>
  ({ ...otherProps }) => {
    const {} = contextProvider;
    return <WrappedComponent {...otherProps} />;
  };

export default WithFetch;
