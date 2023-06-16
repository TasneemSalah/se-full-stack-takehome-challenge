import * as React from "react";
import { ISale } from "../../utils/Sale.interface";
import {
  DestenationText,
  SaleCardContent,
  SaleCardLink,
  TitleText,
} from "./SaleCard.styles";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { UserContext } from "../../context/UserContext";
import axios from "axios";



interface ISaleCardProps {
  sale: Partial<ISale>;

}




export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  const [favList, setFavList] = useState([] as any);;

  const [favourite, setFavourite] = useState(false);
  const baseUrl = 'http://localhost:8080';
  const config = {
    headers: {
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

  const handlefav = async (event: any) => {
    let saleId = sale.id;
    console.log(saleId);
    if (favList.includes(saleId)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
    if (!favourite) {
      try {
        const response = await axios.post(`${baseUrl}/addFavourite`, {
          userId,
          saleId,
        }, config);

        if (response.status === 201) {
          alert(` You have created: ${JSON.stringify(response.data)}`);
        } else if (response.status === 409) {
          throw new Error("Record already exists");
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert("An error has occurred");
      }
    }
    else {
      try {
        const response = await axios.post(`${baseUrl}/removeFavourite`, {
          userId,
          saleId,
        }, config);

        if (response.status === 201) {
          alert(` You have removed: ${JSON.stringify(response.data)}`);
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert("An error has occurred");
      }
    }
  };


  const getFav = async () => {

    try {
      const response = await axios.get(`${baseUrl}/getFavourites/${userId}`,
        config);

      if (response.status === 200) {
        setFavList(response.data);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
    }
  };

  useEffect(() => {
   if(userId!=="") {
   getFav();
   }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userId, setUserId: handleSetUserId }}>
        {userId!=="" ?(
       <div onClick={handlefav}>
          {favList.includes(sale.id) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart style={{ color: 'red' }} />}
        </div>):(<div></div>)}
        <SaleCardLink to={`/sale/${sale.id}`}>
          <img
            width="100%"
            src={sale.photos?.[0].url}
            alt={sale?.editorial?.title}
          />
          <SaleCardContent>
            <DestenationText>{sale?.editorial?.destinationName}</DestenationText>
            <TitleText>{sale?.editorial?.title}</TitleText>
          </SaleCardContent>
        </SaleCardLink>
      </UserContext.Provider>
    </>
  );
};
