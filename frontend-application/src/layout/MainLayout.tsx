import * as React from "react";
import { Outlet } from "react-router-dom";
import { LoginButton } from "../components";
import {
  ContentContainer,
  FlexWrapper,
  Header,
  Logo,
  StyledLink,
} from "./MainLayout.styles";
import { UserContext } from "../context/UserContext";

export const MainLayout: React.FC = (props) => {
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );
  
  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SE_USER_ID", userId);
    setUserId(userId);
  };
  return (
    
    <>
     <UserContext.Provider value={{ userId, setUserId: handleSetUserId}}>
      <Header>
        <ContentContainer>
          <FlexWrapper>
            <Logo />
            <LoginButton />
          </FlexWrapper>
          <ul>
            <li>
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/London">London</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Paris">Paris</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Berlin">Berlin</StyledLink>
            </li>
            {userId !==""? (
            <li>
               <StyledLink to="/favourites">Favourites</StyledLink>
             </li>):(null)}
          </ul>
        </ContentContainer>
      </Header>
      </UserContext.Provider>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};
