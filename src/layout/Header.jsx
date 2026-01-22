import {
  ChevronDown,
  ChevronUp,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import CartDropdown from "../components/header/CartDropdown";
import FavoritesDropdown from "../components/header/FavoritesDropdown";

import { logoutUser } from "../store/actions/userActions";

const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const trToAscii = (s = "") =>
  s.replace(
    /[ıİşŞğĞçÇöÖüÜ]/g,
    (ch) =>
    ({
      ı: "i",
      İ: "i",
      ş: "s",
      Ş: "s",
      ğ: "g",
      Ğ: "g",
      ç: "c",
      Ç: "c",
      ö: "o",
      Ö: "o",
      ü: "u",
      Ü: "u",
    }[ch])
  );

const codeMap = {
  tisort: { label: "T-Shirt", slug: "t-shirt" },
  ayakkabi: { label: "Shoes", slug: "shoes" },
  ceket: { label: "Jacket", slug: "jacket" },
  elbise: { label: "Dress", slug: "dress" },
  etek: { label: "Skirt", slug: "skirt" },
  gomlek: { label: "Shirt", slug: "shirt" },
  kazak: { label: "Sweater", slug: "sweater" },
  pantalon: { label: "Pants", slug: "pants" },
};

const genderMap = {
  k: { label: "Women", path: "women" },
  e: { label: "Men", path: "men" },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const toggleMenu = () => setIsOpen((p) => !p);


  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((s) => s.user?.user);
  const token =
    useSelector((s) => s.user?.token) || localStorage.getItem("token");
  const isAuthed = Boolean(user || token);

  const emailForAvatar = user?.email || "someone@example.com";
  const emailToShow = user?.email || "";

  const categoriesFromStore = useSelector((s) => s.category?.items);
  const categories = Array.isArray(categoriesFromStore)
    ? categoriesFromStore
    : [];

  const catsWomen = categories.filter((c) => c.gender === "k");
  const catsMen = categories.filter((c) => c.gender === "e");

  const keyFromCode = (code = "") => {
    const part = (code.split(":")[1] || "").toString();
    return trToAscii(part)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  };

  const viewOf = (cat) => {
    const key = keyFromCode(cat.code);
    const map = codeMap[key];
    const label = map?.label ?? cat.title;
    const slug = map?.slug ?? slugify(cat.title);
    const g = genderMap[cat.gender] || { path: "unisex" };
    return { label, slug, genderPath: g.path };
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  const cartCount = useSelector((s) =>
    (s.cart?.items || []).reduce((sum, it) => sum + it.count, 0)
  );
  const favCount = useSelector((s) => (s.favorites?.items || []).length);

  return (
    <header className="z-50 relative">
      {/* TOP BAR */}
      <div className="hidden md:flex justify-between px-10 py-5 bg-[#252B42] text-white text-sm font-bold">
        <div className="flex gap-4 items-center">
          <Phone className="h-4" />
          <span>(225) 555-0118</span>
          <Mail className="h-4 ml-5" />
          <span>michelle.rivera@example.com</span>
        </div>
        <p>Follow Us and get a chance to win 80% off</p>
        <div className="flex gap-4">
          <FaInstagram />
          <FaYoutube />
          <FaFacebook />
          <FaXTwitter />
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="flex justify-between items-center px-10 py-5 shadow-md">
        <Link to="/" className="text-2xl font-bold text-[#252B42]">
          Bandage
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-5 text-sm font-bold text-[#737373]">
          <Link to="/">Home</Link>
          <div className="relative flex gap-1">
            <Link to="/shop">Shop</Link>
            {isOpen ? (
              <ChevronUp onClick={toggleMenu} />
            ) : (
              <ChevronDown onClick={toggleMenu} />
            )}
            {isOpen && (
              <div className="absolute top-full mt-2 bg-white shadow-md flex gap-10 p-5">
                {[["Women", catsWomen], ["Men", catsMen]].map(
                  ([title, list]) => (
                    <div key={title} className="flex flex-col gap-3">
                      <span className="font-bold">{title}</span>
                      {list.map((cat) => {
                        const v = viewOf(cat);
                        return (
                          <Link
                            key={cat.id}
                            to={`/shop/${v.genderPath}/${v.slug}/${cat.id}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {v.label}
                          </Link>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex gap-5 text-[#23A6F0]">
          {isAuthed ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <Gravatar
                  email={emailForAvatar}
                  size={28}
                  default="identicon"
                  className="rounded-full"
                />
                <span className="hidden md:block">{emailToShow}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:block font-bold">
                Login
              </Link>
              <Link to="/register" className="hidden md:block font-bold">
                Register
              </Link>
            </>
          )}

          <Search />
          <button onClick={() => setCartOpen((p) => !p)}>
            <ShoppingCart />
            <span className="hidden md:inline">{cartCount}</span>
          </button>
          {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}

          <Menu onClick={toggleMenu} className="md:hidden" />
          <button
            className="hidden md:flex"
            onClick={() => setFavOpen((p) => !p)}
          >
            <Heart /> {favCount}
          </button>
          {favOpen && <FavoritesDropdown onClose={() => setFavOpen(false)} />}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="flex flex-col items-center gap-8 py-20 text-3xl md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)}>Product</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>

          {!isAuthed && (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}

          {isAuthed && (
            <button onClick={handleLogout} className="font-bold text-[#23A6F0]">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
