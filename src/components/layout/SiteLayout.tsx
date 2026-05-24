
import Navbar from "../Navbar";
import Footer from "../Footer";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
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