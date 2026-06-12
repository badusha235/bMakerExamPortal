import Navbar from "@/components/layout/Navbar";
import HomeWelcomeStrip from "@/components/home/HomeWelcomeStrip";
import ExamCategories from "@/components/home/ExamCategories";
import Notifications from "@/components/home/Notifications";
import StudyMaterials from "@/components/home/StudyMaterials";
import MockTestBanner from "@/components/home/MockTestBanner";
import Footer from "@/components/layout/Footer";
import MobileBottomNavigation from "@/components/layout/MobileBottomNavigation";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-50 via-amber-50/50 to-violet-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 15%, #fde68a 0%, transparent 22%),
            radial-gradient(circle at 85% 12%, #bae6fd 0%, transparent 20%),
            radial-gradient(circle at 50% 90%, #ddd6fe 0%, transparent 25%)`,
        }}
      />

      <div className="relative z-10">
        <Navbar />

        <div className="pt-24 md:pt-28">
          <HomeWelcomeStrip />
          <ExamCategories />
          <div className="mx-3 rounded-[2rem] bg-white/80 py-2 shadow-sm ring-2 ring-white/80 backdrop-blur-sm md:mx-6">
            <Notifications />
            <StudyMaterials />
          </div>
          <MockTestBanner />
        </div>

        <Footer />
        <MobileBottomNavigation />
      </div>
    </main>
  );
}
