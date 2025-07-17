import { Link } from "react-router-dom";

export default function CalltoAction() {
  return (
    <div className="w-[414px] h-[999px] md:w-[1440px] md:h-[682px] md:flex md:flex-row flex flex-col pt-[120px] md:pt-0">


      <div className="flex flex-col w-[414px] h-fit gap-[28.1px] md:flex-row md:w-[1439px] md:h-fit md:gap-[30px]">

        {/* Görsel Alanı */}
          <div className="w-full h-[407px] flex flex-col md:w-[704px] md:h-[682px] md:flex-none">
          <img
            src="/c2a.png"
            alt="call to action"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Metin Alanı */}
        <div className="flex flex-col w-[414px] h-fit gap-[28.1px] md:flex-row md:w-[1439px] md:h-fit md:gap-[30px]">
          <div className="w-full h-[207px] flex flex-col m-1 md:m-40 md:w-[704px] md:h-[382px] md:flex-none">
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
    </div>
  );
}

