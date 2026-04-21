import "./style.css";
import Experience from "./Experience/Experience.ts";

const experience = new Experience();

if (!experience) console.error("No experience found");
