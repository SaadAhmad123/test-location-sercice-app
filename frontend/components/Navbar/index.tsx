import React, { useContext } from "react";
import Container from "../Container";
import AppContext from "../../AppContext/Context";
import Toggle from "../Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { useScroll, motion, useTransform } from "framer-motion";
import ThemedImage from "../ThemedImage";

interface INavbar {
  title?: string;
}

const Navbar: React.FC<INavbar> = ({ title }) => {
  return (
    <Container className="flex items-center justify-between py-2 border-b">
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </Container>
  );
};

export default Navbar;
