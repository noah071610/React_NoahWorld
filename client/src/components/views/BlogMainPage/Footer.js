/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Popover } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterDivider = styled(Divider)`
  background-color: white;
  margin: 0 1rem;
`;

function Footer() {
  const social_content = (
    <ul className="blog_footer_content">
      <a href="https://github.com/noah071610" target="_blank" rel="noreferrer">
        <li>- Git</li>
      </a>
      <a href="https://www.instagram.com/salmonchobab/" target="_blank" rel="noreferrer">
        <li>- Instagram</li>
      </a>
    </ul>
  );
  const quickview_content = (
    <ul className="blog_footer_content">
      <Link onClick={() => window.scrollTo({ top: 0 })} to={"/"}>
        <li>- Home</li>
      </Link>
      <Link onClick={() => window.scrollTo({ top: 0 })} to={"/tech"}>
        <li>- Info Tech</li>
      </Link>
      <Link onClick={() => window.scrollTo({ top: 0 })} to={"/daily"}>
        <li>- Daily</li>
      </Link>
      <Link onClick={() => window.scrollTo({ top: 0 })} to={"/class"}>
        <li>- Korean Class</li>
      </Link>
    </ul>
  );
  return (
    <div className="blog_footer">
      <div className="blog_footer_wrapper">
        <div>ⓒ 2021, Jang Hyun Soo. All Rights Resrved.</div>
        <ul className="blog_footer_list">
          <li>
            <Link onClick={() => window.scrollTo({ top: 0 })} to={"/portfolio"}>
              Portfolio
            </Link>
          </li>
          <FooterDivider type="vertical" />
          <Popover content={quickview_content}>
            <li>
              <a>Quick view</a>
            </li>
          </Popover>
          <FooterDivider type="vertical" />
          <Popover content={social_content}>
            <li>
              <a>Social Media</a>
            </li>
          </Popover>
          <FooterDivider type="vertical" />
          <li>
            <a>Feed back</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
