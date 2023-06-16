import * as React from "react";
import { useParams } from "react-router-dom";
import { useFetchSale } from "../../utils/UseFetchSale";
import DOMPurify from "dompurify";
import { ImageWrapper, SaleDetailHeader } from "./SaleDetails.styles";
import { LoadingSpinner } from "../../components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from "axios";


export const SaleDetails: React.FC = () => {
  const params = useParams();
  const id: string = params.id ?? "";
  const { loading, error, sale } = useFetchSale({ saleId: id });
  const [favourite, setFavourite] = useState(false);


  const [favList, setFavList] = useState([] as any);;

  const baseUrl = 'http://localhost:8080';
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );

  const handlefav = async (event: any) => {
    let saleId = id;
    if (favList.includes(id)) {
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
    <div>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {sale && (
        <section>
          <SaleDetailHeader>
            <div>
              <h2>{sale.editorial.destinationName}</h2>
              <h1>{sale.editorial.title}</h1>
            </div>
            <strong>from {sale.prices.leadRate.forDisplay}</strong>
          </SaleDetailHeader>
          {userId!=="" ?(
          <div onClick={(handlefav)} >
            {favList.includes(id) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart style={{ color: 'red' }} />}
          </div>):(<div></div>)}
          <ImageWrapper>
            <img src={sale.photos?.[0].url} alt={sale.editorial?.title} />
          </ImageWrapper>
          {sale.editorial.hotelDetails && (
            <article
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(sale?.editorial?.hotelDetails),
              }}
            />
          )}
        </section>
      )}
    </div>
  );
};
