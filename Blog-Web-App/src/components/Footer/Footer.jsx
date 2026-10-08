import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import Container from "../container/Container";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 border-t border-gray-800/80 py-12 text-gray-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
                Discover insightful stories, creative thinking, and practical ideas from our vibrant community of writers and developers.
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} BlogApp. All Rights Reserved.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
              Legals
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm text-gray-400 hover:text-white transition-colors duration-200" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
