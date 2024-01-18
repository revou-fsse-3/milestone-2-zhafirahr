import { ReactElement } from "react";

const CallToAction = (): ReactElement => {
  return (
    <section className="call-action">
      <form className="email-box d-flex flex-column align-items-center">
        <div className="email-inner">
          <h3 className="m-0">Join 100,000+ Professionals</h3>
          <p>
            Sign up for free and start receiving your daily dose of
            cybersecurity news, insights and tips.
          </p>
          <div className="email-input d-flex">
            <input
              className="w-100 h-100"
              type="text"
              placeholder="Your e-mail address"
            />
            <button className="d-flex align-items-center">
              <i className="chevron right icon fw-bold fs-5" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CallToAction;
