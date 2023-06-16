import * as React from "react";
import {
  SearchResultsHeader,
} from "./Favourites.styles";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useFetchSale } from "../../utils/UseFetchSale";
import {
  DestenationText,
  SaleCardContent,
  SaleCardLink,
  TitleText,
} from "../../components/SaleCard/SaleCard.styles";
import {
  SearchResultsContainer,
} from "../SearchResults/SearchResults.styles";
import { useEffect } from 'react';


let favList:any  = [];

export const Favourites: React.FC = () => {

  const baseUrl = 'http://localhost:8080';
  const config = {
    headers:{
      "Content-Type": "application/json"
    }
  };  
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );
  

  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SE_USER_ID", userId);
    setUserId(userId);
  };

const getFav = async () => {
  
try {
  const response = await axios.get(`${baseUrl}/getFavourites/${userId}`, 
    config);

  if (response.status === 200) {
     favList = response.data; 
  } else {
    throw new Error("An error has occurred");
  }
} catch (error) {
  alert("An error has occurred");
}
};
let saleList:any = [];

 saleList = useFetchSale({ saleId: favList[0] });
 
   useEffect(()=> {
    getFav()
   },[]);

  return (
    <div>
      <SearchResultsHeader>
        <h2>Favourites</h2>
      </SearchResultsHeader>
      <UserContext.Provider value={{ userId, setUserId: handleSetUserId}}>
      <SearchResultsContainer>
      {saleList.sale && (
        <SaleCardLink to={`/sale/${saleList.sale.id}`}>
      <img
        width="100%"
        src={saleList.sale.photos?.[0].url}
        alt={saleList.sale?.editorial?.title}
      />
      <SaleCardContent>
        <DestenationText>{saleList.sale?.editorial?.destinationName}</DestenationText>
        <TitleText>{saleList.sale?.editorial?.title}</TitleText>
      </SaleCardContent>
    </SaleCardLink>          
      )}
     </SearchResultsContainer>
          </UserContext.Provider>

    </div>
  );
};
