import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MorphSVGPlugin, ScrollTrigger, SplitText);

export { gsap as default, gsap, useGSAP, DrawSVGPlugin, MorphSVGPlugin, ScrollTrigger, SplitText };
