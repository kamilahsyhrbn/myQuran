import Background from "../../assets/MosqueBG.png";
import { useDispatch, useSelector } from "react-redux";
import { getDoa, getListDoa } from "../../redux/actions/doaActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Doa() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listDoa, isLoading } = useSelector((state) => state.doa);

  useEffect(() => {
    dispatch(getListDoa());
  }, []);

  const handleSelect = (doa) => {
    dispatch(getDoa(doa));
    navigate(`/baca-doa/${doa}`);
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
          Doa
        </h1>

        {/* DOA CARD */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {listDoa.map((doa, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center w-full bg-white hover:bg-primary hover:text-white transition-all duration-300 p-6 rounded-md cursor-pointer hover:shadow-primary hover:shadow-md"
              onClick={() => handleSelect(doa)}
            >
              <p className="capitalize">{doa}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
