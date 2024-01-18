import { ReactElement } from "react";
import FooterExtraLinksWrapper from "./FooterExtraLinksWrapper";

const FooterExtraLinks = (): ReactElement => {
  const extraLinks = [
    {
      header: "Company",
      links: ["About THN", "Advertise with us", "Contact"],
    },
    {
      header: "Pages",
      links: ["Webinars", "Deals Store", "Privacy Policy"],
    },
    {
      header: "Deals",
      links: ["Hacking", "Development", "Android"],
    },
  ];

  return (
    <div className="footer-extra pb-4 px-5">
      <div className="footer-extra-lists d-flex justify-content-between">
        {extraLinks.map((linkObject, i) => (
          <FooterExtraLinksWrapper key={i} linkObject={linkObject} />
        ))}
      </div>
      <div className="footer-extra-buttons d-flex flex-column align-items-end justify-content-center">
        <button className="d-flex py-2 justify-content-start ps-5 align-items-baseline rss-button">
          <i className="rss icon pe-4" />
          <span>RSS Feeds</span>
        </button>
        <button className="d-flex py-2 justify-content-start ps-5 align-items-baseline">
          <i className="envelope outline icon pe-4" />
          <span>Contact Us</span>
        </button>
      </div>
    </div>
  );
};

export default FooterExtraLinks;
