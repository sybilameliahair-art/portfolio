import { createContext, useCallback, useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Preloader } from "./components/Preloader";
import { SmoothScroll } from "./components/SmoothScroll";
import { Book } from "./pages/Book";
import { Home } from "./pages/Home";

const IntroContext = createContext(false);

export function useIntroReady() {
  return useContext(IntroContext);
}

export function App() {
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const showFooter = location.pathname !== "/book" || ready;
  const finishIntro = useCallback(() => setReady(true), []);

  return (
    <IntroContext.Provider value={ready}>
      {!ready ? <Preloader onDone={finishIntro} /> : null}
      <CustomCursor />
      <SmoothScroll>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
        </Routes>
        {showFooter ? <Footer /> : null}
      </SmoothScroll>
    </IntroContext.Provider>
  );
}
