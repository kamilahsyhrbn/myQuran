import { useEffect, useState } from "react";
import Background from "../../assets/MosqueBG.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDoa } from "../../redux/actions/doaActions";
import { setSelectedDua } from "../../redux/reducers/doaReducers";

export default function BacaDoa() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDoa = useParams();
  const { doa, selectedDua, isLoading } = useSelector((state) => state.doa);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(setSelectedDua([]));
    dispatch(getDoa(selectedDoa?.doa));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-max bg-fixed"
    >
      <div className="py-20 px-4 md:px-10 lg:px-24">
        <h1 className="text-4xl font-bold text-primary arabic text-center capitalize">
          Doa {selectedDoa?.doa}
        </h1>

        {/* DOA CARD */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {doa?.map((doa, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center w-full bg-white hover:bg-primary hover:text-white transition-all duration-300 p-6 rounded-md cursor-pointer hover:shadow-primary hover:shadow-md"
              onClick={() => {
                handleModal(), dispatch(setSelectedDua([doa]));
              }}
            >
              <p className="text-center">{doa?.judul}</p>
            </div>
          ))}
        </section>
      </div>

      {/* DETAIL MODAL */}
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
          {selectedDua?.map((doa, i) => (
            <div className="relative bg-white rounded-lg shadow" key={i}>
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-[#3A5A40]">
                  {doa?.judul}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="surah-modal"
                  onClick={() => {
                    handleModal(), dispatch(setSelectedDua([]));
                  }}
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

              <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[70vh]">
                <p className="text-2xl leading-[3rem] arabic" dir="rtl">
                  {doa?.arab}
                </p>
                <p className="text-loose">{doa?.indo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
