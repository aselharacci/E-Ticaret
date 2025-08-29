import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "MEN",
    img: "/category-pick-1.jpg",
    id: "1",
  },
  {
    title: "WOMEN",
    img: "/category-pick-2.jpg",
    id: "2",
  },
  {
    title: "ACCESSORIES",
    img: "/category-pick-3.jpg",
    id: "3",
  },
  {
    title: "KIDS",
    img: "/category-pick-4.jpg",
    id: "4",
  },
];

const CategoryPick = () => {
  return (
    <section className="bg-[#FAFAFA] w-full flex justify-center items-center py-20">
      <div className="w-[333px] md:w-[1124px] flex flex-col md:gap-12 gap-12 md:items-center items-start relative">
        {/* Title & Description */}
        <div className="flex flex-col items-center gap-2 md:w-[607px] w-full mx-auto">
          <h2 className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] font-montserrat">
            EDITOR’S PICK
          </h2>
          <p className="text-[#737373] text-[14px] leading-5 tracking-[0.2px] font-normal text-center md:w-[342px] w-[193px]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Category Cards */}
        <div className="flex flex-col md:flex-row md:gap-[30px] gap-[30px] md:w-[1050px] w-[325px] mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?categoryId=${category.id}`} // ShopPage’e kategoriId ile yönlendir
              className="relative bg-white md:w-[240px] w-[325px] md:h-[500px] h-[500px] overflow-hidden rounded-md hover:shadow-lg transition"
            >
              <img
                src={category.img}
                alt={category.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute left-4 bottom-4 w-[170px] h-12 bg-white flex items-center justify-center shadow-md px-4">
                <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42]">
                  {category.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPick;
