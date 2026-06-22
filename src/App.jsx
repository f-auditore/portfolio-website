import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skill from "./components/Skill";
import ScrollWrapper from "./assets/ScrollWrapper";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import PageLoader from "./assets/PageLoader";
import CursorFollower from "./assets/CursorFollower";
import ScrollProgressBar from "./assets/ScrollProgressBar";
import BackToTop from "./assets/BackToTop";
import ActiveSectionDots from "./assets/ActiveSectionDots";

function App() {
  return (
    <>
      {/* Page loader - shows on first visit */}
      <PageLoader />

      {/* Scroll progress indicator at top */}
      <ScrollProgressBar />

      {/* Custom cursor follower (desktop only) */}
      <CursorFollower />

      {/* Section navigation dots (right side) */}
      <ActiveSectionDots />

      {/* Back to top button */}
      <BackToTop />

      <Navbar />
      <ScrollWrapper>
        <Home />
        <About />
        <Skill />
        <Project />
        <Gallery />
        <Contact />
        <Footer />
      </ScrollWrapper>
    </>
  );
}

export default App;