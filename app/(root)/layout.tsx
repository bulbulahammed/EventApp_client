import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "../next-Toast";
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <ToastContainer />
      <Footer />
    </div>
  );
}
