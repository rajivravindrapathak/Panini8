import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const MobileMenuContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`;

const MobileNavLink = styled.a`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
`;

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <MobileMenuContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      {isOpen && (
        <MenuOverlay onClick={() => setIsOpen(false)}>
          <MobileNav>
            <MobileNavLink href="/">Home</MobileNavLink>
            {user ? (
              <>
                <MobileNavLink href="/profile">Profile</MobileNavLink>
                <MobileNavLink href="/create-post">Create Post</MobileNavLink>
                <MobileNavLink onClick={logout}>Logout</MobileNavLink>
              </>
            ) : (
              <>
                <MobileNavLink href="/login">Login</MobileNavLink>
                <MobileNavLink href="/register">Register</MobileNavLink>
              </>
            )}
          </MobileNav>
        </MenuOverlay>
      )}
    </MobileMenuContainer>
  );
};

export default MobileMenu;