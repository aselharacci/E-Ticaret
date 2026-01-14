import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../api/productsApi";

const FavProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts(8)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading featured products...</p>;
  }

  return (
    <section className="w-full bg-white flex flex-col items-center py-20 gap-12">
      <h3 className="font-bold text-2xl">BESTSELLER PRODUCTS</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="flex flex-col items-center"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-64 object-cover"
            />
            <h5 className="font-bold mt-3">{p.title}</h5>
            <p className="text-sm text-gray-500">{p.brand}</p>
            <p className="font-bold text-green-600">${p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FavProducts;
