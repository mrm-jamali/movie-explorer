import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}