import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SaleDetails, SearchResults, Favourites } from "./pages";
import { MainLayout } from "./layout/MainLayout";
import { UserContext } from "./context/UserContext";

export const App: React.FC = () => {
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );

  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SE_USER_ID", userId);
    setUserId(userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId}}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sale/:id" element={<SaleDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/search" element={<SearchResults />} />        
        {userId!==""?(
          <Route path={userId!==""? "/favourites":"/"} element={<Favourites />}/>):
          (null)}
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};
