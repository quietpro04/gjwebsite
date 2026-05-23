import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WebsiteContent from "./components/WebsiteContent";
import ToolsPage from "./components/ToolsPage";
import MainReel from "./components/MainReel";
import NotFound from "./components/NotFound";
import IdeasPage from "./components/IdeasPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              <div className="relative z-20">
                <WebsiteContent isVisible={true} />
              </div>
            </div>
          }
        />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/reel" element={<MainReel />} />
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
