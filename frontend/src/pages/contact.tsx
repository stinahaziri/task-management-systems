// ...existing code...
import React from "react";
import "./styles/contactStyle.css";
import Header from "./header";
import kitee from "./image/kite.png";

function Contact() {
  return (
    <>
      <Header />
      <section className="contact">
        <div className="row">
          <div className="col">
            <div className="info">
              <h4>Get in touch</h4>
              <h1>
                We're on hand to help <br /> you along the way
              </h1>
              <h3>
                Product enquiries? Interested in one of our <br /> services?
                Reach out here and we’ll be in <br /> touch shortly.
              </h3>
              <h2>final@project.com</h2>
              <h2>+44 (0)123 456 7890</h2>
            </div>

            <div className="location">
              <iframe
                title="office-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752299.4048114854!2d20.341640690831262!3d42.562309155566396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13537af354bf7df1%3A0xbfffeedfabc31791!2sKosovo!5e0!3m2!1sen!2s!4v1655755183193!5m2!1sen!2s"
                width="250"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <ul>
                <li>11A Alma Road,</li>
                <li>Headingley,</li>
                <li>Leeds</li>
                <li>LS6 2AH</li>
              </ul>
            </div>
          </div>

          <div className="colum">
            <div className="title">
              <h1>get in touch</h1>
            </div>

            <form>
              <div className="firstInput">
                <div className="inputGroup">
                  <input type="text" placeholder="First Name" maxLength={50} />
                </div>
                <div className="inputGroup">
                  <input type="text" placeholder="Last Name" maxLength={50} />
                </div>
              </div>

              <div className="seconInput">
                <div className="inputGroup">
                  <input type="email" placeholder="Email" maxLength={100} />
                </div>
                <div className="inputGroup">
                  <input type="tel" placeholder="Phone" maxLength={20} />
                </div>
                <div className="inputGroup">
                  <textarea cols={45} rows={10} placeholder="Comment" />
                </div>
              </div>

              <div className="terms">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">
                  I agree to Equinox’s <b>Privacy Policy</b> terms.
                </label>
              </div>

              <button type="submit" className="sendButton">
                Send
              </button>
            </form>
          </div>
        </div>

        <footer>
          <div className="row">
            <div className="col">
              <img src={kitee} alt="logo" />
            </div>
            <div className="col">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/news">News</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="/pricing">Pricing</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/signUp">Sign</a>
                </li>
              </ul>
            </div>
            <div className="formsFooter">
              <input type="text" placeholder="Enter your email" />
              <button>Get Started</button>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Contact;
// ...existing code...