import { useEffect } from "react";
import Routers from "@/routers";
import "virtual:windi.css";
import "@/assets/markdown-theme/typora-lark.css";
import figlet from "figlet";
import figletFont from "figlet/importable-fonts/Larry 3D 2.js";

figlet.parseFont("FigletFont", figletFont);

const App = () => {
  useEffect(() => {
    figlet.text(
      "yuyichen",
      {
        font: "FigletFont",
      },
      function (err, data) {
        console.info(`%c ${data}`, "color: red");
      }
    );
  }, []);
  return <Routers />;
};

export default App;
