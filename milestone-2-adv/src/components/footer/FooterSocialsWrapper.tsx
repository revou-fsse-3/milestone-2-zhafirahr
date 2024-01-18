import { ReactElement } from "react";
import { SocialAndFollowerType } from "./Footer";

const FooterSocialsWrapper = ({
  social,
  is1000,
}: {
  social: SocialAndFollowerType;
  is1000: boolean;
}): ReactElement => {
  const { icon, href, backgroundColor, followers } = social;

  return (
    <div className="social-wrapper d-flex flex-column align-items-center">
      <a
        href={href}
        target="_blank"
        className="social-icon d-flex align-items-center"
        style={
          icon === "instagram icon"
            ? { background: backgroundColor }
            : { backgroundColor: backgroundColor }
        }
      >
        <i className={icon} />
      </a>
      {!is1000 && <span className="pt-3">{followers} followers</span>}
    </div>
  );
};

export default FooterSocialsWrapper;
