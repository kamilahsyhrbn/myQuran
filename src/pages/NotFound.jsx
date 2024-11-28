import Background from "../assets/MosqueBG.png";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
      }}
      className="w-full min-h-screen bg-cover bg-no-repeat bg-fixed"
    >
      <div className="flex items-center justify-center h-screen">
        <h1 className="uppercase tracking-widest text-xl">404 | Not Found</h1>
      </div>
    </div>
  );
}
