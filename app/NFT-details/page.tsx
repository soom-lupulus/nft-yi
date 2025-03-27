import React from "react";

//INTERNAL IMPORT
import { Button, Category, Brand } from "@/components";
import NFTDetailsPage from "@/NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
