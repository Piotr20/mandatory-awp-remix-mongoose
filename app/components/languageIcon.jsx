import { SiJavascript } from "@react-icons/all-files/si/SiJavascript";
import { SiPhp } from "@react-icons/all-files/si/SiPhp";
import { RiCodeBoxFill } from "@react-icons/all-files/ri/RiCodeBoxFill";
import { DiReact } from "@react-icons/all-files/di/DiReact";
import { DiAngularSimple } from "@react-icons/all-files/di/DiAngularSimple";
import { FaVuejs } from "@react-icons/all-files/fa/FaVuejs";
import { FaNode } from "@react-icons/all-files/fa/FaNode";

import { SiRust } from "@react-icons/all-files/si/SiRust";

const LanguageIcon = ({ LanguageName, className }) => {
  switch (LanguageName) {
    case "Php":
      return <SiPhp className={className} />;
    case "JS":
      return <SiJavascript className={className} />;
    case "React":
      return <DiReact className={className} />;
    case "Angular":
      return <DiAngularSimple className={className} />;
    case "Vue":
      return <FaVuejs className={className} />;
    case "Node":
      return <FaNode className={className} />;
    case "Rust":
      return <SiRust className={className} />;
    default:
      return <RiCodeBoxFill className={className} />;
  }
};
export default LanguageIcon;
