import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailSurah } from "../../redux/actions/quranActions";

import Background from "../../assets/MosqueBG.png";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { PiMosque } from "react-icons/pi";
import {
  IoBookOutline,
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { BsFileText } from "react-icons/bs";

export default function BacaSurat() {
  const selectedSurat = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedSurah } = useSelector((state) => state.quran);

  const [showModal, setShowModal] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyat, setCurrentAyat] = useState(null);

  console.log("selectedSurah", selectedSurah);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getDetailSurah(selectedSurat?.nomor));
  }, [selectedSurat]);

  // Play/Pause toggle
  const handlePlayPause = (ayat, i) => {
    if (isPlaying && currentAyat === ayat) {
      // Pause if currently playing the same ayat
      if (audio) audio.pause();
      setIsPlaying(false);
    } else {
      // Play new audio
      if (audio) audio.pause(); // Stop current audio
      const newAudio = new Audio(ayat.audio[Object.keys(ayat.audio)[0]]);
      newAudio.play();
      setAudio(newAudio);
      setCurrentAyat(ayat);
      setIsPlaying(true);

      // Handle when the audio ends
      newAudio.onended = () => {
        setIsPlaying(false);

        // If there's a next ayat, play it
        // const currentAyatIndex = selectedSurah?.ayat?.findIndex(
        //   (item) => item === ayat
        // );
        // if (currentAyatIndex !== -1) {
        //   const nextAyat = selectedSurah?.ayat?.[currentAyatIndex + 1];
        //   if (nextAyat) {
        //     handlePlayPause(nextAyat); // Play next ayat
        //   } else {
        //     console.log("No more ayat to play.");
        //   }
        // }
      };
    }
  };

  // Skip to the previous ayat
  const handleSkipBack = () => {
    if (!currentAyat) return;

    const currentIndex = selectedSurah.ayat.findIndex(
      (a) => a.nomorAyat === currentAyat.nomorAyat
    );
    const prevAyat =
      selectedSurah.ayat[
        (currentIndex - 1 + selectedSurah.ayat.length) %
          selectedSurah.ayat.length
      ];

    handlePlayPause(prevAyat);
  };

  // Skip to the next ayat
  const handleSkipForward = () => {
    if (!currentAyat) return;

    const currentIndex = selectedSurah.ayat.findIndex(
      (a) => a.nomorAyat === currentAyat.nomorAyat
    );
    const nextAyat =
      selectedSurah.ayat[(currentIndex + 1) % selectedSurah.ayat.length];

    handlePlayPause(nextAyat);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-max bg-fixed"
    >
      <div className="py-20 px-4 md:px-10 lg:px-24">
        <div className="flex justify-between items-center mb-10">
          <button
            className="flex items-center gap-1 font-medium hover:text-tertiary"
            onClick={() => navigate("/")}
          >
            <IoMdArrowRoundBack className="text-xl text-primary" />
            <span className="hidden md:block">Kembali</span>
          </button>

          <div className="flex gap-2">
            <button
              className={`border border-primary px-4 py-2 min-w-30 max-w-48 rounded-s-full hover:bg-tertiary transition-all duration-300 flex items-center justify-center ${
                selectedSurah?.suratSebelumnya
                  ? "cursor-pointer hover:text-white"
                  : "cursor-not-allowed hover:bg-transparent hover:text-tertiary"
              }`}
              onClick={() => {
                if (!selectedSurah?.suratSebelumnya) return;
                navigate(
                  `/baca-surat/${selectedSurah?.suratSebelumnya?.nomor}`
                );
              }}
            >
              <IoIosArrowBack className="text-xl" />{" "}
              {selectedSurah?.suratSebelumnya
                ? selectedSurah?.suratSebelumnya?.namaLatin
                : "-"}
            </button>
            <button
              className={`border border-primary px-4 py-2 min-w-30 max-w-48 rounded-e-full hover:bg-tertiary transition-all duration-300 flex items-center justify-center ${
                selectedSurah?.suratSelanjutnya
                  ? "cursor-pointer hover:text-white"
                  : "cursor-not-allowed hover:bg-transparent hover:text-tertiary"
              }`}
              onClick={() => {
                if (!selectedSurah?.suratSelanjutnya) return;
                navigate(
                  `/baca-surat/${selectedSurah?.suratSelanjutnya?.nomor}`
                );
              }}
            >
              {selectedSurah?.suratSelanjutnya?.namaLatin
                ? selectedSurah?.suratSelanjutnya?.namaLatin
                : "-"}{" "}
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>

        {/* SURAH TITLE */}
        <div className="text-center mt-6">
          <h1 className="text-4xl font-bold arabic text-center" dir="rtl">
            {selectedSurah?.nama}
          </h1>
          <h3 className="text-2xl font-medium arabic mt-3">
            {selectedSurah?.namaLatin}{" "}
            <span className="text-2xl font-medium arabic">
              ({selectedSurah?.arti})
            </span>
          </h3>

          <div className="flex justify-center items-center gap-2 mt-2">
            <p className="font-medium bg-secondary rounded-full px-2 flex items-center gap-1 text-lg">
              <span>
                <PiMosque />
              </span>{" "}
              {selectedSurah?.tempatTurun}
            </p>
            <p className="font-medium bg-secondary rounded-full px-2 flex items-center gap-1 text-lg">
              <span>
                <IoBookOutline />
              </span>
              {selectedSurah?.jumlahAyat} Ayat
            </p>
          </div>
          <div className="flex justify-center items-center mt-3">
            <button
              className="font-medium bg-secondary rounded-full px-2 flex items-center gap-1 text-lg w-max"
              onClick={handleModal}
            >
              <span>
                <BsFileText />
              </span>
              Deskripsi
            </button>
          </div>
        </div>

        {/* SURAH CONTENT */}
        <div>
          <h2 className="arabic text-center text-4xl my-20" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </h2>

          <div>
            {selectedSurah?.ayat?.map((ayat, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 my-10 border-b-2 border-primary/5 pb-10"
              >
                <p
                  className="w-full text-3xl arabic text-right leading-[5rem]"
                  dir="rtl"
                >
                  {ayat?.teksArab}
                </p>
                <p className="text-primary italic">{ayat?.teksLatin}</p>
                <div className="flex gap-2">
                  <p>{ayat?.nomorAyat}.</p>
                  <p>{ayat?.teksIndonesia}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-lg text-primary hover:text-tertiary"
                    onClick={() =>
                      navigate(
                        `/tafsir-ayat/${selectedSurah?.nomor}/${ayat?.nomorAyat}`
                      )
                    }
                  >
                    <BsFileText />
                  </button>
                  <button
                    onClick={() => handlePlayPause(ayat)}
                    className="text-lg text-primary hover:text-tertiary"
                  >
                    {isPlaying && currentAyat === ayat ? (
                      <IoPause />
                    ) : (
                      <IoPlay />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll no-scrollbar transition-opacity duration-300  ${
          showModal ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full max-w-4xl max-h-full transform transition-transform duration-300 ease-in-out ${
            showModal ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-[#3A5A40]">
                Deskripsi Q.S {selectedSurah?.namaLatin}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="surah-modal"
                onClick={handleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <p
                className="text-base leading-relaxed "
                dangerouslySetInnerHTML={{
                  __html: selectedSurah?.deskripsi,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AUDIO PLAYER */}
      {currentAyat && (
        <div className="fixed bottom-4 left-4 flex items-center gap-4 bg-white p-4 shadow-lg rounded-lg z-[999999]">
          <button
            className="text-lg text-white absolute -top-1 -right-2 bg-tertiary hover:bg-primary p-2 rounded-full"
            onClick={() => {
              setCurrentAyat(null), audio?.pause(), setIsPlaying(false);
            }}
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <button
            className="text-lg text-primary hover:text-tertiary"
            onClick={handleSkipBack}
          >
            <IoPlaySkipBack />
          </button>
          <button
            className="text-lg text-primary hover:text-tertiary"
            onClick={() => handlePlayPause(currentAyat)}
          >
            {isPlaying ? <IoPause /> : <IoPlay />}
          </button>
          <button
            className="text-lg text-primary hover:text-tertiary"
            onClick={handleSkipForward}
          >
            <IoPlaySkipForward />
          </button>
          <p className="text-primary">
            Sedang Memutar: Ayat {currentAyat.nomorAyat}
          </p>
        </div>
      )}
    </div>
  );
}
