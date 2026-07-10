import ExploreCta from "../sections/ExploreCta";
import Footer from "./Footer";

// The CTA banner and footer appear together at the end of most pages — call this once instead of both.
export default function PageFooter() {
  return (
    <>
      <ExploreCta />
      <Footer />
    </>
  );
}
