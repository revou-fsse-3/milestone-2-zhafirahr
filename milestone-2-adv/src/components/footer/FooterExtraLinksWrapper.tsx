import { ReactElement } from "react";

type LinkObjectType = {
  header: string;
  links: string[];
};

const FooterExtraLinksWrapper = ({
  linkObject,
}: {
  linkObject: LinkObjectType;
}): ReactElement => {
  const header = linkObject.header;

  return (
    <div className="d-flex flex-column footer-list">
      <span className="footer-list-header fw-bold">{header}</span>
      {linkObject.links.map((link) => (
        <span key={link} className="footer-list-item">
          {link}
        </span>
      ))}
    </div>
  );
};

export default FooterExtraLinksWrapper;
