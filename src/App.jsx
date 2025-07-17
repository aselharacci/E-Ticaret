import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header"; // Header bileşenini buradan import ettik
import Slider from "./components/home-components/HeroSlider";
import CategoryPick from "./components/home-components/CategoryPick"; 
import FavProducts from "./components/home-components/FavProducts";
import BottomSlider from "./components/home-components/BottomSlider"; // BottomSlider bileşenini import ettik
import CalltoAction from "./components/home-components/CalltoAction";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      {/* Header her sayfada sabit görünecek */}
      <Header />
      <Slider />
      <CategoryPick />
      <FavProducts />
      <BottomSlider />
      <CalltoAction />
      {/* Route içerikleri - HomePage ve diğerleri kaldırıldı, şimdilik sadece Header ve Slider görünür olacak */}
      <Footer />
      
      <Switch>
        {/* Buraya ileride farklı sayfalarınız için rotalar ekleyebilirsiniz. */}
      </Switch>
    </Router>
  );
}
export default App;