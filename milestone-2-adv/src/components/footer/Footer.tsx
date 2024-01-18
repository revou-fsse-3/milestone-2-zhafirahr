import { ReactElement, memo } from "react";
import FooterSocialsWrapper from "./FooterSocialsWrapper";
import "../../styling/footer.css";
import FooterExtraLinks from "./FooterExtraLinks";

export type SocialAndFollowerType = {
  icon: string;
  followers: string;
  backgroundColor: string;
  href: string;
};

const Footer = ({ is1000 }: { is1000: boolean }): ReactElement => {
  const socialsAndFollowers: SocialAndFollowerType[] = [
    {
      icon: "twitter icon",
      followers: "894,000",
      backgroundColor: "#1da1f2",
      href: "https://twitter.com/thehackersnews",
    },
    {
      icon: "facebook f icon",
      followers: "1,950,000",
      backgroundColor: "#4267b2",
      href: "https://www.facebook.com/thehackernews",
    },
    {
      icon: "linkedin icon",
      followers: "452,000",
      backgroundColor: "#007bb6",
      href: "https://www.linkedin.com/company/thehackernews/",
    },
    {
      icon: "youtube icon",
      followers: "20,900",
      backgroundColor: "#ce332d",
      href: "https://www.youtube.com/c/thehackernews?sub_confirmation=1",
    },
    {
      icon: "instagram icon",
      followers: "144,000",
      backgroundColor:
        "linear-gradient(45deg,#f09433 0,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      href: "https://www.instagram.com/thehackernews/",
    },
    {
      icon: "telegram icon",
      followers: "110,000",
      backgroundColor: "#2AABEE",
      href: "https://t.me/joinchat/AAAAADwuDObFWF60CiR-HQ",
    },
  ];

  return (
    <footer className="footer px-2 pt-5 d-flex flex-column">
      <h3 className="text-center pb-1">Connect with us!</h3>
      <div className="socials-outer-container d-flex justify-content-center py-5">
        <div className="socials-inner-container">
          {socialsAndFollowers.map((social, i) => (
            <FooterSocialsWrapper key={i} social={social} is1000={is1000} />
          ))}
        </div>
      </div>
      <FooterExtraLinks />
      <p className="footer-note px-2 py-3">
        © The Hacker News, 2023. All Rights Reserved.
      </p>
    </footer>
  );
};

export default memo(Footer);
