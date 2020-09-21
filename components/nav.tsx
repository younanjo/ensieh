import React from 'react';
import Styled from 'styled-components';

const StyledNav = Styled.nav`
:global(body) {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
    Helvetica, sans-serif;
}
nav {
  text-align: center;
}
ul {
  display: flex;
  justify-content: space-between;
}
nav > ul {
  padding: 4px 16px;
}
li {
  display: flex;
  padding: 6px 8px;
}
a {
  color: #067df7;
  text-decoration: none;
  font-size: 13px;
}
`;

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
].map((link: any) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <StyledNav>
    <ul>
      <li>
        <a href="/">
          <span>Home</span>
        </a>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  </StyledNav>
);

export default Nav;
