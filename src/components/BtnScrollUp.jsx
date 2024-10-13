import ScrollToTop from "react-scroll-up";
import { ImArrowUp2 } from "react-icons/im";

export default function BtnScrollUp() {
  return (
    <div className="relative z-[300]">
      <ScrollToTop showUnder={130}>
        <div className="font-bold cursor-pointer bg-secondary text-white text-2xl rounded-full p-3">
          <ImArrowUp2 />
        </div>
      </ScrollToTop>
    </div>
  );
}
