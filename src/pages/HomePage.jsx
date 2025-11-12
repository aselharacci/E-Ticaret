import CategoryPick from "../components/home-components/CategoryPick";
import HeroSlider from "../components/home-components/HeroSlider";
import FavProducts from "../components/home-components/FavProducts";
import BottomSlider from "../components/home-components/BottomSlider";
import FeaturedPosts from "../components/home-components/FeaturedPosts";
import CallToAction from "../components/home-components/CallToAction";

export default function Home() {
	return (
		<main>
			<HeroSlider />
			<CategoryPick />
			<FavProducts />
			<BottomSlider />
			<CallToAction />
			<FeaturedPosts />
		</main>
	);
}