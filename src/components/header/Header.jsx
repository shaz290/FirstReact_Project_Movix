import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";


const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    const controlNavBar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            }
            else {
                setShow("show")
            }
        } else {
            setShow("top")
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavBar)
        return () => {
            window.removeEventListener("scroll", controlNavBar)

        }
    }, [lastScrollY])

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }

    const neavigationHanlder = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");

        }

        setMobileMenu(false)
    }

    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.trim().length > 0) {
            navigate(`/search/${query.trim()}`);
            setTimeout(() => {
                setShowSearch(false)
            }, 1000)
        }
    };

    return <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
            <div className="logo" onClick={() => navigate("/")}>
                <img src={logo} alt="" />
            </div>

            <ul className="menuItems">
                <li className="menuItem" onClick={() => neavigationHanlder("movie")}>Movies</li>
                <li className="menuItem" onClick={() => neavigationHanlder("tv")}>Tv Shows</li>
                <li className="menuItem">
                    <HiOutlineSearch onClick={openSearch} />
                </li>
            </ul>

            <div className="mobileMenuItems">
                <HiOutlineSearch onClick={openSearch} />
                {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu
                    onClick={openMobileMenu} />
                )}
            </div>
        </ContentWrapper>

        {showSearch && <div className="searchBar">
            <ContentWrapper>
                <div className="searchInput">
                    <input
                        type="text"
                        placeholder="Search for a movie or TV show..."
                        value={query}
                        onKeyUp={searchQueryHandler}
                    />
                    <VscChromeClose onClick={() => setShowSearch(false)} />
                </div>
            </ContentWrapper>
        </div>}
    </header>
};

export default Header;