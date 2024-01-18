import { ReactElement } from "react";

const PlaceHolderMain = (): ReactElement => {
  return (
    <div data-testid="placeholder" className="ui segment loading-placeholder">
      <div className="ui active inverted dimmer real-loader">
        <div className="ui large text loader"></div>
      </div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
};

export default PlaceHolderMain;
