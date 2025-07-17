import { Link } from "react-router-dom";

export default function CalltoAction() {
  return (
    <div className="relative w-full h-[753px] overflow-hidden">
      <div className="w-full h-[500px] flex flex-col md:flex-row items-center  p-6 md:p-0">

        {/* Görsel Alanı */}
          <div className="order-2 md:order-1 w-full md:w-1/2 h-[753px] md:h-[700px]">
          <img
            src="/c2a.png"
            alt="call to action"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Metin Alanı */}
        <div className="order-1 md:order-2 w-full md:w-1/2 p-25 flex flex-col text-center md:text-left items-center md:items-start gap-4 md:gap-6 max-w-md md:max-w-none">
          <h5 className=" font-montserrat font-bold text-base text-[#BDBDBD]">SUMMER 2020</h5>
          <h2 className=" font-montserrat font-bold text-[40px] leading-tight md:text-[40px] md:leading-[70px] text-[#252B42]">
            Part of the Neural Universe
          </h2>
          <h4 className=" font-montserrat text-[20px] leading-relaxed text-[#737373]">
            We know how large objects will act,
            <br className="font-montserrat hidden md:block" />
            but things on a small scale.
          </h4>
          <span className="text-2xl font-bold text-[#252B42]">$16.48</span>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/maintenance">
              <button className="font-montserrat h-[50px] px-8 bg-[#2DC071] text-white font-bold text-base rounded-md hover:bg-[#208a54] transition-colors duration-300">
                BUY NOW
              </button>
            </Link>
            <Link to="/maintenance">
              <button className="font-montserrat h-[50px] px-8 border border-[#2DC071] text-[#2DC071] font-bold text-base rounded-md hover:bg-[#e0f7e9] transition-colors duration-300">
                READ MORE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

