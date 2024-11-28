import React, { useEffect } from "react";

import Background from "../../assets/MosqueBG.png";
import { useDispatch, useSelector } from "react-redux";
import { getDetailSurah, getSurah } from "../../redux/actions/quranActions";

import SearchInput from "../../components/SearchInput";
import { useNavigate } from "react-router-dom";

export default function Quran() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quran, isLoading } = useSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getSurah());
  }, []);

  const handleSurahSelect = (surah) => {
    navigate(`/baca-surat/${surah?.nomor}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-max bg-fixed"
    >
      <div className="py-20 px-4 md:px-10 lg:px-24">
        <h1 className="text-4xl font-bold text-primary arabic text-center">
          Quran
        </h1>

        {/* SEARCH INPUT */}
        <section className="md:w-3/5 mx-auto mt-5 mb-10">
          <SearchInput
            className="rounded-xl py-3 px-2 focus:ring-0 focus:outline-none w-full"
            placeholder="Mau baca surat apa hari ini?"
            onChange={handleSurahSelect}
          />
        </section>

        {/* POPULAR SURAHS */}
        <section className="my-5 overflow-x-auto">
          <div className="flex gap-5 items-center md:justify-center">
            <button
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300 whitespace-nowrap"
              onClick={() => {
                navigate("/baca-surat/36");
              }}
            >
              Yasin
            </button>
            <button
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300 whitespace-nowrap"
              onClick={() => {
                navigate("/baca-surat/56");
              }}
            >
              Al-Waqiah
            </button>
            <button
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300 whitespace-nowrap"
              onClick={() => {
                navigate("/baca-surat/67");
              }}
            >
              Al-Mulk
            </button>
            <button
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300 whitespace-nowrap"
              onClick={() => {
                navigate("/baca-surat/18");
              }}
            >
              Al-Kahf
            </button>
            <button
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-tertiary transition-colors duration-300 whitespace-nowrap"
              onClick={() => {
                navigate("/baca-surat/55");
              }}
            >
              Ar-Rahman
            </button>
          </div>
        </section>

        {/* QURAN LIST */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {quran?.map((surah) => (
            <div
              key={surah?.nomor}
              className="group flex gap-5 md:items-center md:gap-2 md:flex-row justify-between w-full bg-white hover:bg-primary hover:text-white transition-all duration-300 p-6 rounded-md cursor-pointer hover:shadow-primary hover:shadow-md"
              onClick={() => {
                navigate(`/baca-surat/${surah?.nomor}`);
              }}
            >
              <div className="flex gap-5">
                <div className="bg-accent text-quaternary px-2 py-1 rounded-md h-max group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <h5 className="font-semibold">{surah?.nomor}</h5>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-bold">{surah?.namaLatin}</h3>
                  <p className="text-quaternary text-sm group-hover:text-lightGray transition-all duration-300">
                    {surah?.arti}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <h3 className="font-bold arabic text-2xl">{surah?.nama}</h3>
                <p className="text-quaternary text-sm group-hover:text-lightGray transition-all duration-300">
                  {surah?.jumlahAyat} Ayat
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
