import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Background from "../../assets/MosqueBG.png";

export default function BacaSurat() {
  const { selectedSurah } = useSelector((state) => state.quran);
  const dispatch = useDispatch();

  console.log("selectedSurah", selectedSurah);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-max bg-fixed"
    >
      <div className="py-20 px-4 md:px-10 lg:px-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary arabic text-center">
            {selectedSurah?.namaLatin}
          </h1>
        </div>
      </div>
    </div>
  );
}
