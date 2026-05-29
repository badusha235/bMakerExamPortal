import Navbar from "@/components/layout/Navbar";
import ExamCategories from "@/components/home/ExamCategories";
import Notifications from "@/components/home/Notifications";
import StudyMaterials from "@/components/home/StudyMaterials";
import MockTestBanner from "@/components/home/MockTestBanner";
import Footer from "@/components/layout/Footer";
import MobileBottomNavigation from "@/components/layout/MobileBottomNavigation";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />

      <div className="pt-24 md:pt-32">
        <ExamCategories />
        <Notifications />
        <StudyMaterials />
        <MockTestBanner />
      </div>

      <Footer />

      <MobileBottomNavigation />
    </main>
  );
}
