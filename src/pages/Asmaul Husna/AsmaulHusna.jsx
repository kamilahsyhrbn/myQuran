import { useEffect } from "react";
import Background from "../../assets/MosqueBG.png";
import { getAsma } from "../../redux/actions/asmaActions";
import { useDispatch, useSelector } from "react-redux";

export default function AsmaulHusna() {
  const dispatch = useDispatch();

  const { asma, isLoading } = useSelector((state) => state.asma);

  useEffect(() => {
    dispatch(getAsma());
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-max bg-fixed"
    >
      <div className="py-20 px-4 md:px-10 lg:px-24">
        <h1 className="text-4xl font-bold text-primary arabic text-center">
          Asmaul Husna
        </h1>

        {/* ASMAUL HUSNA CARD */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {asma.map((asma) => (
            <div
              key={asma.id}
              className="group flex flex-col items-center justify-center w-full bg-white hover:bg-primary hover:text-white transition-all duration-300 p-6 rounded-md cursor-default hover:shadow-primary hover:shadow-md"
            >
              <h1 className="text-3xl font-bold ">{asma?.arab}</h1>
              <p className="text-sm italic my-4 text-primary group-hover:text-white">
                {asma?.latin}
              </p>
              <p className="text-center">{asma?.indo}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
