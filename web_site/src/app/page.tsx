import Footer from "./components/Footer/footer";
import { SpotlightPreview } from "./components/Pages/Home/sparklesBanner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SpotlightPreview />
      <Footer />
    </div>
  );
}
