import React from "react";
import Spinner from "../components/spinner/spinner.component";

const WithSpinner = (WrappedComponent) => {
  return ({ loading, ...otherProps }) => {
    return loading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  };
};

export default WithSpinner;
