// app/components/Footer.js
import Link from "next/link";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const FooterSection = ({ title, children }) => (
  <div className="w-full md:w-1/4 mb-6 md:mb-0">
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    {children}
  </div>
);

const FooterLink = ({ href, children }) => (
  <li className="mb-2">
    <Link
      href={href}
      className="hover:text-gray-300 transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <FooterSection title="DevReady Academy">
            <p className="text-sm">
              Achieve Career Success with Expert Coaching, Mock Interviews.
            </p>
          </FooterSection>

          <FooterSection title="Quick Links">
            <ul className="text-sm">
              <FooterLink href="/termsConditions">
                Terms and Conditions
              </FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/refund">Refund Policy</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </FooterSection>

          <FooterSection title="Contact Us">
            <p className="text-sm mb-2">Email: devreadyacademy@gmail.com</p>
            <p className="text-sm mb-2">Phone:+918468095857</p>
          </FooterSection>

          <FooterSection title="Follow Us">
            <div style={{ display: "flex", gap: "10px", fontSize: "24px" }}>
              {/* YouTube Icon */}
              <a
                href="https://www.youtube.com/@TechdevGuru"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube style={{ color: "#ffff" }} />
              </a>

              {/* Facebook Icon */}
              <a
                href="https://www.instagram.com/devguruzone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook style={{ color: "#ffff" }} />
              </a>

              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/devguruzone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram style={{ color: "#ffff" }} />
              </a>
            </div>
          </FooterSection>
        </div>
      </div>
    </footer>
  );
}
