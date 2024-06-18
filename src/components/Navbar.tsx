// components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiTelegramFill,
  RiWhatsappFill,
  RiMoreFill,
  RiShareLine,
  RiShareBoxLine,
} from "react-icons/ri";
import { BiStats } from "react-icons/bi";
import Link from "next/link";

interface INavbar {
  name: string;
  username: string;
  backgroundColor: string;
  textColor: string;
  navClass?: string;
}

const Navbar = ({ name, username, backgroundColor, textColor, navClass }: any) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showDetailsMenu, setShowDetailsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };
  const toggleDetailsMenu = () => {
    setShowDetailsMenu(!showDetailsMenu);
  };

  // Function to share the current page on social media
  const sharePage = (platform: any) => {
    // if localhost, use the default link
    let link;
    if (window.location.href.includes("localhost")) {
      link = "https://freebio.dev";
    } else {
      // else, use the current link
      link = window.location.href;
    }

    // You can customize the share URL for each social media platform
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${link}`,
          "_blank"
        );
        break;
      case "instagram":
        window.open(`https://www.instagram.com/?url=${link}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${link}`, "_blank");
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${link}&title=${document.title}&summary=${document.title}&source=${window.location.href}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(`https://t.me/share/url?url=${link}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${link}`, "_blank");
        break;
      // Add more social media platforms here if needed
      default:
        break;
    }
    setShowShareMenu(false); // Hide the menu after sharing
  };

  // Function to handle clicks outside the menu and detail button
  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowShareMenu(false);
      setShowDetailsMenu(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={navClass}
    >
      <div
        className="container mx-auto h-full flex items-center justify-between px-4 py-3"
        ref={menuRef}
      >
        {/* Your Navbar content here */}
        <div>
          <button
            id="detailsButton"
            aria-label="More details"
            className="text-2xl font-bold hover:bg-slate-500 rounded-full p-2"
            onClick={toggleDetailsMenu}
          >
            <RiMoreFill />
          </button>
          {showDetailsMenu && (
            <div className={`bg-${backgroundColor} bg-opacity-20 backdrop-blur-md backdrop-filter absolute left-0 top-12 mt-3 rounded-lg p-3`}>
              <ul>
                <li>
                  <button
                    id="statButton"
                    aria-label="Visitor Stats"
                    className={`text-${textColor}-300 hover:text-gray-400 block`}
                  >
                    <Link
                      href={`https://app.splitbee.io/public/freebio.dev?filter=%7B"page"%3A"%2F${username}%22%7D`}
                    >
                      <a>
                        <BiStats className="inline-block mr-1 -mt-1 text-xl" />
                        Visitor Stats
                      </a>
                    </Link>
                  </button>
                </li>
                <li>
                  <button
                    id="createButton"
                    aria-label="Create your own bio"
                    className={`text-${textColor}-300 hover:text-gray-400 block mt-2`}
                  >
                    <Link href={`https://freebio.dev/create`}>
                      <a>
                        <RiShareBoxLine className="inline-block mr-1 -mt-1 text-xl" />
                        Create your own bio</a>
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <h1>
            <span className="text-2xl font-bold">{name}</span>
          </h1>
        </div>
        <div>
          <button
            id="shareButton"
            aria-label="Share this page"
            className="ml-auto text-2xl font-bold hover:bg-slate-500 rounded-full p-2"
            onClick={toggleShareMenu}
          >
            <RiShareLine />
          </button>
          {showShareMenu && (
            <div className={`bg-${backgroundColor} bg-opacity-20 backdrop-blur-md backdrop-filter absolute right-0 top-12 mt-3 rounded-lg p-3`}>
            <ul>
                <li>
                  <button
                    id="facebookButton"
                    aria-label="Share on Facebook"
                    onClick={() => sharePage("facebook")}
                    className={`text-${textColor}-300 hover:text-gray-400 block w-full text-left`}
                  >
                    <RiFacebookCircleFill className="inline-block mr-1 -mt-1 text-xl" />
                    Share on Facebook
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => sharePage("instagram")}
                    className={`text-${textColor}-300 hover:text-gray-400 block w-full text-left mt-1`}
                  >
                    <RiInstagramFill className="inline-block mr-1 -mt-1 text-xl" />
                    Share on Instagram
                  </button>
                </li> */}
                <li>
                  <button
                    id="twitterButton"
                    aria-label="Share on Twitter"
                    onClick={() => sharePage("twitter")}
                    className={`text-${textColor}-300 hover:text-gray-400 block w-full text-left mt-3`}
                  >
                    <RiTwitterFill className="inline-block mr-1 -mt-1 text-xl" />
                    Share on Twitter
                  </button>
                </li>
                <li>
                  <button
                    id="linkedinButton"
                    aria-label="Share on LinkedIn"
                    onClick={() => sharePage("linkedin")}
                    className={`text-${textColor}-300 hover:text-gray-400 block w-full text-left mt-3`}
                  >
                    <RiLinkedinFill className="inline-block mr-1 -mt-1 text-xl" />
                    Share on LinkedIn
                  </button>
                </li>
                <li>
                  <button
                    id="telegramButton"
                    aria-label="Share on Telegram"
                    onClick={() => sharePage("telegram")}
                    className={`text-${textColor}-300 hover:text-gray-400 block w-full text-left mt-3`}
                  >
                    <RiTelegramFill className="inline-block mr-1 -mt-1 text-xl" />
                    Share on Telegram
                  </button>
                </li>
                <li>
                  <button
                    id="whatsappButton"
                    aria-label="Share on WhatsApp"
                    onClick={() => sharePage("whatsapp")}
                    className={`text-${textColor}-300 hover:text-gray-400 block w-full text-left mt-3`}
                  >
                    <RiWhatsappFill className="inline-block mr-1 -mt-1 text-xl" />
                    Share on WhatsApp
                  </button>
                </li>
                {/* Add more social media sharing buttons here if needed */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;