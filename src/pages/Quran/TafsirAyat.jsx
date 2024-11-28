import { useDispatch, useSelector } from "react-redux";
import Background from "../../assets/MosqueBG.png";
import { getTafsirAyah } from "../../redux/actions/quranActions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { PiMosque } from "react-icons/pi";
import { IoBookOutline, IoPlay, IoPause } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";

export default function TafsirAyat() {
  const { tafsirAyah, isLoading } = useSelector((state) => state.quran);
  const { nomorSurat, nomorAyat } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getTafsirAyah(nomorSurat));
  }, [nomorSurat, nomorAyat]);

  const tafsirAyat = tafsirAyah?.tafsir?.filter(
    (item) => item.ayat === parseInt(nomorAyat)
  );
  //   console.log("tafsirAyat", tafsirAyat);
  console.log("tafsirAyah", tafsirAyah);
  const nextAyat = parseInt(nomorAyat) + 1;
  const prevAyat = parseInt(nomorAyat) - 1;

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-screen bg-cover bg-no-repeat bg-fixed"
    >
      <div className="py-20 px-4 md:px-10 lg:px-24">
        <div className="flex justify-between items-center mb-10">
          <button
            className="flex items-center gap-1 font-medium hover:text-tertiary"
            onClick={() => navigate(`/baca-surat/${tafsirAyah?.nomor}`)}
          >
            <IoMdArrowRoundBack className="text-xl text-primary" />
            <span className="hidden md:block">Q.S {tafsirAyah?.namaLatin}</span>
          </button>

          <div className="flex gap-2">
            <button
              className={`border border-primary px-4 py-2 min-w-30 max-w-48 rounded-s-full hover:bg-tertiary transition-all duration-300 flex items-center justify-center ${
                prevAyat > 0
                  ? "cursor-pointer hover:text-white"
                  : "cursor-not-allowed hover:bg-transparent hover:text-tertiary"
              }`}
              onClick={() => {
                if (prevAyat == 0) return;
                navigate(`/tafsir-ayat/${tafsirAyah?.nomor}/${prevAyat}`);
              }}
            >
              <IoIosArrowBack className="text-xl" />{" "}
              {prevAyat > 0 ? "Ayat " + prevAyat : "-"}
            </button>
            <button
              className={`border border-primary px-4 py-2 min-w-30 max-w-48 rounded-e-full hover:bg-tertiary transition-all duration-300 flex items-center justify-center ${
                nextAyat <= tafsirAyah?.jumlahAyat
                  ? "cursor-pointer hover:text-white"
                  : "cursor-not-allowed hover:bg-transparent hover:text-tertiary"
              }`}
              onClick={() => {
                if (nextAyat > tafsirAyah?.jumlahAyat) return;
                navigate(`/tafsir-ayat/${tafsirAyah?.nomor}/${nextAyat}`);
              }}
            >
              {nextAyat <= tafsirAyah?.jumlahAyat ? "Ayat " + nextAyat : "-"}
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>

        {/* SURAH TITLE */}
        <div className="text-center mt-6">
          <h1 className="text-4xl font-bold arabic text-center" dir="rtl">
            {tafsirAyah?.nama}
          </h1>
          <h3 className="text-2xl font-medium arabic mt-3">
            {tafsirAyah?.namaLatin}{" "}
            <span className="text-2xl font-medium arabic">
              ({tafsirAyah?.arti})
            </span>
          </h3>

          <div className="flex justify-center items-center gap-2 mt-2">
            <p className="font-medium bg-secondary rounded-full px-2 flex items-center gap-1 text-lg">
              <span>
                <PiMosque />
              </span>{" "}
              {tafsirAyah?.tempatTurun}
            </p>
            <p className="font-medium bg-secondary rounded-full px-2 flex items-center gap-1 text-lg">
              <span>
                <IoBookOutline />
              </span>
              {tafsirAyah?.jumlahAyat} Ayat
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

        {/* TAFSIR */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {tafsirAyat?.map((tafsir, index) => (
            <div
              key={index}
              className="bg-white px-4 py-2 rounded-md shadow hover:shadow-md transition-all duration-300 flex flex-col items-center"
            >
              <p className="text-xl font-medium text-center mb-5">
                Tafsir Ayat {tafsir?.ayat}
              </p>
              <p className="">{tafsir?.teks}</p>
            </div>
          ))}
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
                Deskripsi Q.S {tafsirAyah?.namaLatin}
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
                  __html: tafsirAyah?.deskripsi,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
