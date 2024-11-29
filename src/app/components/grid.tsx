"use client"

import { useEffect, useRef, useState } from "react";
export default function Grid({state, data}: any) {
    const { generator, mppt, battery, load_1, load_2, load_3 } = state;
    const svgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const K1 = generator;
        const K2 = battery;
        const K3 = load_2;
        const K4 = load_3;
        const K5 = load_1;

    // Utility functions to set styles and visibility
    function setStyle(selector: string, attribute: string, value: string) {
        const element: any = svgRef.current?.querySelector(selector);
        if (element) {
          element.style.fill = value;
        }
        console.log(element);
      }
  
      function setInvisible(selector: string, state: string) {
        const element = svgRef.current?.querySelector(selector);
        if (element) {
          element.setAttribute("visibility", state);
        };
      }

      if (mppt) {
        setStyle("#rect7", "fill", "#ffffff");
      } else {
        setStyle("#rect7", "fill", "#808080");
      }
  
      if (K1) {
        setInvisible("#K1_NC", "visible");
        setInvisible("#K1_NO", "hidden");
        setStyle("#bulet_K1", "fill", "#ffffff");
      } else {
        setInvisible("#K1_NC", "hidden");
        setInvisible("#K1_NO", "visible");
        setStyle("#bulet_K1", "fill", "#808080");
      }
  
      if (K2) {
        setInvisible("#K2_NC", "visible");
        setInvisible("#K2_NO", "hidden");
        setStyle("#bulet_K2", "fill", "#ffffff");
        setStyle("#Baterai", "fill", "#f0f0f0");
      } else {
        setInvisible("#K2_NC", "hidden");
        setInvisible("#K2_NO", "visible");
        setStyle("#bulet_K2", "fill", "#808080");
        setStyle("#Baterai", "fill", "#808080");
      }
  
      if (K3) {
        setInvisible("#K3_NC", "visible");
        setInvisible("#K3_NO", "hidden");
        setStyle("#bulet_K3", "fill", "#ffffff");
        setStyle("#rect3-0-9", "fill", "#f0f0f0");
      } else {
        setInvisible("#K3_NC", "hidden");
        setInvisible("#K3_NO", "visible");
        setStyle("#bulet_K3", "fill", "#808080");
        setStyle("#rect3-0-9", "fill", "#808080");
      }
  
      if (K4) {
        setInvisible("#K4_NC", "visible");
        setInvisible("#K4_NO", "hidden");
        setStyle("#bulet_K4", "fill", "#ffffff");
        setStyle("#rect3-0", "fill", "#f0f0f0");
      } else {
        setInvisible("#K4_NC", "hidden");
        setInvisible("#K4_NO", "visible");
        setStyle("#bulet_K4", "fill", "#808080");
        setStyle("#rect3-0", "fill", "#808080");
      }
  
      if (K5) {
        setInvisible("#K5_NC", "visible");
        setInvisible("#K5_NO", "hidden");
        setStyle("#bulet_K5", "fill", "#ffffff");
        setStyle("#load", "fill", "#f0f0f0");
      } else {
        setInvisible("#K5_NC", "hidden");
        setInvisible("#K5_NO", "visible");
        setStyle("#bulet_K5", "fill", "#808080");
        setStyle("#load", "fill", "#808080");
      }
    }, [state])
    

    return (
        <div ref={svgRef}
        dangerouslySetInnerHTML={{
        __html: `
        <svg  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" width="200mm" height="120mm" viewBox="0 0 33.67559051513672 23.811023712158203" version="1.1" id="svg2" sodipodi:docname="SVG Bayu Terbaru (1).svg" inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)" inkscape:export-filename="revv2.svg" inkscape:export-xdpi="96" inkscape:export-ydpi="96" preserveAspectRatio="xMidYMid meet"><rect id="svgEditorBackground" x="0" y="0" width="33.67559051513672" height="23.811023712158203" style="fill:none;stroke:none"/>
        <defs id="defs2">
            <rect x="601.72614" y="376.07884" width="44.244569" height="27.652856" id="rect1"/>
            <inkscape:path-effect effect="spiro" id="path-effect32" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29" is_visible="true" lpeversion="1"/>
            <linearGradient id="swatch22" inkscape:swatch="solid">
            <stop style="stop-color:#000000;stop-opacity:1;" offset="0" id="stop22"/>
            </linearGradient>
            <linearGradient id="swatch18" inkscape:swatch="solid">
            <stop style="stop-color:#000000;stop-opacity:1;" offset="0" id="stop18"/>
            </linearGradient>
            <linearGradient id="swatch11" inkscape:swatch="solid">
            <stop style="stop-color:#000000;stop-opacity:1;" offset="0" id="stop11"/>
            </linearGradient>
            <rect x="514.16187" y="379.98605" width="131.57076" height="48.30331" id="rect11"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect32-7" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-9" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-08" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-2" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-2" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-39" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-09" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-04" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-9" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-02" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-04-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-9-8" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-02-5" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-2-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-39-2" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-09-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-08-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-0-8" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-2-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-1-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect31-7" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-0-8" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-8" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-26" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-5" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect32-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-26-5" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-26-5-1" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-26-5-1-9" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-1" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-1-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-2" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-0-8-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-8" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-0-8-0-1" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-8-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect30-0-8-0-1-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-86" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-7" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-6" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-5" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-1-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-00" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-0-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-15-6-6-0" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-5-8" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-5-2" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-5-2-7" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-5-2-7-4" is_visible="true" lpeversion="1"/>
            <inkscape:path-effect effect="spiro" id="path-effect29-6-5-2-7-2" is_visible="true" lpeversion="1"/>
        </defs>
        <sodipodi:namedview id="namedview2" pagecolor="#ffffff" bordercolor="#000000" borderopacity="0.25" inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" showgrid="false" inkscape:zoom="1.4142136" inkscape:cx="573.4636" inkscape:cy="453.96255" inkscape:window-width="1350" inkscape:window-height="728" inkscape:window-x="0" inkscape:window-y="0" inkscape:window-maximized="0" inkscape:current-layer="svg2" inkscape:document-units="mm"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 5.0105339,5.1295264 V 8.5697436" id="path3"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 6.1814053,5.0973239 V 8.6006013" id="path3-8"/>
        <g id="converter" transform="matrix(0.47757772,0,0,0.48472804,-1.751845,4.6512228)">
            <rect style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-dasharray:none" id="rect3" width="5.5559769" height="5.1461101" x="12.751423" y="8.1973438"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.299137;stroke-dasharray:none" d="m 12.754223,13.264879 5.464536,-5.006985 -0.03459,0.059185" id="path4"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.302929;stroke-linejoin:miter;stroke-dasharray:none" d="m 13.339137,9.3313374 c 1.18267,1.2095386 1.069929,-0.7515766 2.386723,-0.00978" id="path5" sodipodi:nodetypes="cc"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:none" d="m 15.529411,12.10803 2.044943,-0.0081" id="path6"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:0.226772, 0.226772;stroke-dashoffset:0" d="m 15.528932,12.718022 2.045901,0.0037" id="path7"/>
        </g>
        <g id="g22" inkscape:label="Mppt" transform="matrix(0.66220462,0,0,0.66779741,2.9772108,0.63334592)">
            <rect style="fill:none;stroke:#000000;stroke-width:0.178788;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0" id="rect7" width="3.8376944" height="4.9423938" x="10.055954" y="10.669615"/>
            <rect style="fill:none;stroke:#000000;stroke-width:0.155989;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0" id="rect8" width="2.5229769" height="1.6760769" x="10.765874" y="11.187021"/>
            <text xml:space="preserve" transform="matrix(0.03036555,0,0,0.03672607,-5.5929219,-0.54701154)" id="text11" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:19.8557px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;baseline-shift:baseline;white-space:pre;shape-inside:url(#rect11);display:inline;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:8.859;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="23.481812" y="0"><tspan x="553.48916" y="385.69147" id="tspan4"><tspan style="baseline-shift:baseline" id="tspan2">MPPT</tspan></tspan></text>
            <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.72px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26577;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="10.649877" y="14.414472" id="text18"><tspan sodipodi:role="line" id="tspan18" style="stroke-width:0.26577" x="10.649877" y="14.414472">+</tspan></text>
            <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.72px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26577;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="10.649878" y="15.086197" id="text19"><tspan sodipodi:role="line" id="tspan19" style="stroke-width:0.26577" x="10.649878" y="15.086197">-</tspan></text>
            <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.72px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26577;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="13.360733" y="14.369048" id="text18-8"><tspan sodipodi:role="line" id="tspan18-4" style="stroke-width:0.26577" x="13.360733" y="14.369048">+</tspan></text>
            <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.72px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26577;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="13.360734" y="15.040774" id="text19-4"><tspan sodipodi:role="line" id="tspan19-2" style="stroke-width:0.26577" x="13.360734" y="15.040774">-</tspan></text>
            <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.459303px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.16954;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="11.041011" y="14.834163" id="text20" transform="scale(0.96411998,1.0372153)"><tspan sodipodi:role="line" id="tspan20" style="stroke-width:0.16954" x="11.041011" y="14.834163">In</tspan><tspan sodipodi:role="line" style="stroke-width:0.16954" x="11.041011" y="14.834163" id="tspan21"/></text>
            <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.483379px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.178427;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="13.940523" y="14.67637" id="text22" transform="scale(0.95266829,1.0496833)"><tspan sodipodi:role="line" id="tspan22" style="stroke-width:0.178427" x="13.940523" y="14.67637">Out</tspan></text>
        </g>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 9.6029295,9.9777391 H 6.9663678" id="path3-8-3" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 21.100647,9.9726921 H 13.905181" id="path3-8-3-8" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 16.312373,12.777617 V 10.743182" id="path3-8-3-8-1" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.150478;stroke-dasharray:none" d="m 16.325661,10.03556 v 0.324838" id="path3-8-3-8-5" inkscape:label="vcc-dc-mppt"/>
        <rect style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.125305;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="Baterai" width="3.8984656" height="2.5372496" x="14.325181" y="15.858443"/>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.515926px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.216237;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="16.404722" y="17.29327" id="text23" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan23" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.57325px;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.216237;stroke-dasharray:none" x="16.404722" y="17.29327">Battery</tspan></text>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.515926px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.190441;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="15.297267" y="16.301056" id="text24" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan24" style="stroke-width:0.190441" x="15.297267" y="16.301056">+</tspan></text>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.515926px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.190441;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="17.335379" y="16.300491" id="text25" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan25" style="stroke-width:0.190441" x="17.335379" y="16.300491">-</tspan></text>
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.216237;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.200631,10.372449 0.00813,0.569261" id="path25"/>
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.216237;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.107185,10.417498 -0.00406,0.479163" id="path26"/>
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.216237;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 8.2290711,10.421593 V 10.93352" id="path27"/>
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.216237;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.2453226,10.405212 v 0.421827" id="path28"/>
        <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29" inkscape:path-effect="#path-effect29" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" transform="matrix(0.77877592,0,0,0.90683713,10.020531,-3.1021807)" sodipodi:nodetypes="csc"/>
        <path style="fill:#808080;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29-8" transform="matrix(0,-0.76981301,0.81563969,0,1.3881022,16.188346)" sodipodi:nodetypes="csc" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" inkscape:path-effect="#path-effect29-6"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 12.735991,9.9711471 H 12.20741" id="path3-8-3-8-9" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.136564;stroke-dasharray:none" d="M 13.454991,9.9595447 H 12.710718" id="K1_NC" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.101996;stroke-dasharray:none" d="M 16.305945,13.354646 V 12.770069" id="K2_NC" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 24.000495,11.601744 H 23.256222" id="K3_NC" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 24.077377,16.370213 H 23.333104" id="K4_NC" inkscape:label="vcc-dc-mppt"/>
        <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.130435;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal" d="m 16.924099,16.354839 0.0057,1.935484" id="path32" inkscape:path-effect="#path-effect32" inkscape:original-d="m 16.924099,16.354839 c -0.0019,0.641366 0.0019,1.288425 0.0057,1.935484" transform="matrix(0.7048004,0,0,1.0975529,4.3723628,-4.2098987)"/>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.573251px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="13.177279" y="9.2869101" id="text32" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan32" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="13.177279" y="9.2869101">K1</tspan></text>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.573251px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="17.223555" y="12.769599" id="text32-5" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan32-0" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="17.223555" y="12.769599">K2</tspan></text>
        <ellipse style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.172814;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:0.172814, 0.172814;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="path34" cx="16.327778" cy="9.9534836" rx="0.21330063" ry="0.20681809"/>
        <ellipse style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.172814;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:0.172814, 0.172814;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="path34-1-8-4" cx="21.078663" cy="9.9817219" rx="0.21330063" ry="0.20681809"/>
        <g id="g37" transform="matrix(0.49725391,0,0,0.52305244,0.98502163,2.0541598)">
            <ellipse style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.22599;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="path35" cx="9.0971241" cy="3.9608717" rx="1.0787739" ry="1.094875"/>
            <ellipse style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.258865;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="load" cx="55.181961" cy="34.545105" rx="2.3808837" ry="2.2370851"/>
            <g id="g36" transform="translate(0.78557875,-0.0227704)">
            <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.279789;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 4.511466,3.9570872 c 0.763939,-0.3524491 1.5806458,-0.4686577 2.5279914,0 v 0" id="path36" sodipodi:nodetypes="ccc"/>
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.279789;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 7.0351548,3.9986842 c -0.763939,0.3524491 -1.5806458,0.4686577 -2.5279914,0 v 0" id="path36-4" sodipodi:nodetypes="ccc"/>
            </g>
            <g id="g36-4" transform="translate(5.7198468,-0.04181009)">
            <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.279789;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 4.511466,3.9570872 c 0.763939,-0.3524491 1.5806458,-0.4686577 2.5279914,0 v 0" id="path36-41" sodipodi:nodetypes="ccc"/>
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.279789;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 7.0351548,3.9986842 c -0.763939,0.3524491 -1.5806458,0.4686577 -2.5279914,0 v 0" id="path36-4-3" sodipodi:nodetypes="ccc"/>
            </g>
            <g id="g36-4-6" transform="rotate(90,8.6575258,4.3852816)">
            <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.279789;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 4.511466,3.9570872 c 0.763939,-0.3524491 1.5806458,-0.4686577 2.5279914,0 v 0" id="path36-41-3" sodipodi:nodetypes="ccc"/>
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.279789;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 7.0351548,3.9986842 c -0.763939,0.3524491 -1.5806458,0.4686577 -2.5279914,0 v 0" id="path36-4-3-9" sodipodi:nodetypes="ccc"/>
            </g>
        </g>
        <path style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29-8-0-93-3" transform="matrix(0,-0.76981301,0.81563968,0,11.953948,17.822288)" sodipodi:nodetypes="csc" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" inkscape:path-effect="#path-effect29-6-5-2-7"/>
        <path style="fill:#6e6e6e;fill-opacity:0.86859;stroke:none;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" d="m 24.056933,11.658858 0.01043,-0.04876 c 0,0 0.0183,-0.0695 0.09733,-0.09173 0.02216,-0.0062 0.0516,-0.01236 0.08222,-0.0052 0.02648,0.0062 0.06054,0.01394 0.08804,0.04851 0.01182,0.01486 0.01481,0.01768 0.02691,0.04569 0.006,0.01384 0.0092,0.02339 0.0092,0.02339 l 0.0029,0.02862" id="bulet_K3" sodipodi:nodetypes="ccsssscc" inkscape:label="bulet_K2"/>
        <path style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.161936;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 4.9862508,5.1858682 C 5.3970728,4.7341094 5.3970728,4.7341094 5.3970728,4.7341094" id="path37"/>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.161936;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 6.2093542,5.1630972 C 5.7985321,4.7113383 5.7985321,4.7113383 5.7985321,4.7113383" id="path37-3"/>
        <g id="inverter" transform="matrix(0.47757772,0,0,0.48472804,21.119391,11.078903)" inkscape:label="Inverter">
            <rect style="fill:none;stroke:#000000;stroke-width:0.312754;stroke-dasharray:none" id="rect3-0" width="5.5559769" height="5.1461101" x="12.751423" y="8.1973438"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.299137;stroke-dasharray:none" d="m 12.754223,13.264879 5.464536,-5.006985 -0.03459,0.059185" id="path4-7"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.302929;stroke-linejoin:miter;stroke-dasharray:none" d="m 15.288168,12.079496 c 1.18267,1.209539 1.069929,-0.751576 2.386723,-0.0098" id="path5-3" sodipodi:nodetypes="cc"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:none" d="m 13.411945,9.0970037 2.044943,-0.0081" id="path6-3"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:0.226772, 0.226772;stroke-dashoffset:0" d="m 13.411466,9.7069957 2.045901,0.0037" id="path7-0"/>
        </g>
        <g id="adaptor" transform="matrix(0.47757772,0,0,0.48472804,21.16313,6.2971359)" inkscape:label="Inverter">
            <rect style="fill:none;stroke:#000000;stroke-width:0.312754;stroke-dasharray:none" id="rect3-0-9" width="5.5559769" height="5.1461101" x="12.751423" y="8.1973438"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.299137;stroke-dasharray:none" d="m 12.754223,13.264879 5.464536,-5.006985 -0.03459,0.059185" id="path4-7-6"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:none" d="m 13.411945,9.0970037 2.044943,-0.0081" id="path6-3-9"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:0.226772, 0.226772;stroke-dashoffset:0" d="m 13.411466,9.7069957 2.045901,0.0037" id="path7-0-8"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:none" d="m 15.5413,11.87796 2.044943,-0.0081" id="path6-3-9-7"/>
            <path style="fill:none;stroke:#000000;stroke-width:0.226772;stroke-linejoin:miter;stroke-dasharray:0.226772, 0.226772;stroke-dashoffset:0" d="m 15.540821,12.487952 2.045901,0.0037" id="path7-0-8-4"/>
        </g>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.401276px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="5.6158218" y="11.49794" id="text40-3" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan40-0" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="5.6158218" y="11.49794">Converter</tspan></text>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.401276px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="28.622055" y="21.874002" id="text40-3-3" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan40-0-3" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="28.622055" y="21.874002">Load</tspan></text>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.401276px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="28.701998" y="13.191766" id="text40-3-1" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan40-0-0" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="28.772535" y="13.191766">Adaptor </tspan></text>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.401276px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="28.622883" y="17.883173" id="text40-2" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan40-09" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="28.622883" y="17.883173">Inverter</tspan></text>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 21.072416,20.376112 C 21.072094,10.08286 21.072027,10.052407 21.072027,10.052407" id="path44-9"/>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 24.443609,11.604343 c 2.747307,0.0014 2.747307,0.0014 2.747307,0.0014" id="path46-8"/>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.401276px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="5.5816441" y="1.882677" id="text40-3-0" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan40-0-9" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="5.5816441" y="1.882677">Generator</tspan></text>
        <g id="K1_NO" transform="matrix(0.68619666,0,0,0.69226905,2.8549911,-0.05948865)" inkscape:label="K1_NO" style="stroke-width:0.166979;stroke-dasharray:none">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.166647;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 14.028339,14.426828 0.934563,-0.646307" id="path30" transform="matrix(1.0039941,0,0,1,0.25766849,0.06825993)" inkscape:original-d="m 14.028339,14.426828 c 0.269238,0.03415 0.440807,-0.31847 0.934563,-0.646307" inkscape:path-effect="#path-effect30" sodipodi:nodetypes="cc"/>
        </g>
        <g id="K2_NO" transform="matrix(0.68619666,0,0,0.69226905,5.9810828,3.1630111)" inkscape:label="K1_2" style="stroke-width:0.166979;stroke-dasharray:none">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.166647;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 15.254861,14.508856 14.817253,13.773064" id="path30-4" transform="matrix(1.0039941,0,0,1,0.19431008,0.06306459)" inkscape:original-d="m 15.254861,14.508856 c 0.34349,0.0054 -0.785123,-0.733092 -0.437608,-0.735792" inkscape:path-effect="#path-effect30-26" sodipodi:nodetypes="cc"/>
        </g>
        <ellipse style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.172814;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:0.172814, 0.172814;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="path34-16" cx="21.069401" cy="11.581776" rx="0.21330063" ry="0.20681809"/>
        <g id="K1_NO-4-5-9" transform="matrix(0.68619666,0,0,0.69226905,17.849975,10.409907)" inkscape:label="K1_2">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.21;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 16.228413,15.31422 13.828369,12.997528" id="path30-4-1-7" transform="matrix(1.0039941,0,0,1,0.33284496,-0.11590519)" inkscape:original-d="m 16.228413,15.31422 c 0.34349,0.0054 -2.747559,-2.313992 -2.400044,-2.316692" inkscape:path-effect="#path-effect30-26-5-1" sodipodi:nodetypes="cc"/>
        </g>
        <g id="K1_NO-4-5-9-2" transform="matrix(0.68619666,0,0,-0.69226905,17.890612,29.850104)" inkscape:label="K1_2">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.21;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="M 16.228413,15.31422 13.828369,12.997528" id="path30-4-1-7-8" transform="matrix(1.0039941,0,0,1,0.33284496,-0.11590519)" inkscape:original-d="m 16.228413,15.31422 c 0.34349,0.0054 -2.747559,-2.313992 -2.400044,-2.316692" inkscape:path-effect="#path-effect30-26-5-1-9" sodipodi:nodetypes="cc"/>
        </g>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 24.447413,16.371605 c 2.688398,0.0014 2.688398,0.0014 2.688398,0.0014" id="path46-8-2"/>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.573251px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="23.18162" y="10.999023" id="text32-2-6-6" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan32-6-5-8" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="23.18162" y="10.999023">K3</tspan></text>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 21.141533,11.602642 c 2.149432,-2.21e-4 2.149432,-2.21e-4 2.149432,-2.21e-4" id="path45-8"/>
        <g id="K3_NO" transform="matrix(0.68619666,0,0,0.69226905,13.390038,1.5754929)" inkscape:label="K1_2" style="stroke-width:0.166979;stroke-dasharray:none">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.166647;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 14.028339,14.426828 0.809187,-0.655134" id="path30-9-4-4" transform="matrix(1.0039941,0,0,1,0.28075764,0.06825993)" inkscape:original-d="m 14.028339,14.426828 c 0.34349,0.0054 0.461672,-0.652434 0.809187,-0.655134" inkscape:path-effect="#path-effect30-0-8-0" sodipodi:nodetypes="cc"/>
        </g>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.573251px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="23.259872" y="15.68259" id="text32-2-6-6-2" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan32-6-5-8-0" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="23.259872" y="15.68259">K4</tspan></text>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 21.186291,16.371294 c 2.149432,-2.21e-4 2.149432,-2.21e-4 2.149432,-2.21e-4" id="path45-8-9"/>
        <g id="K4_NO" transform="matrix(0.68619666,0,0,0.69226905,13.434796,6.3441445)" inkscape:label="K1_2" style="stroke-width:0.166979;stroke-dasharray:none">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.166647;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 14.028339,14.426828 0.809187,-0.655134" id="path30-9-4-4-0" transform="matrix(1.0039941,0,0,1,0.28075764,0.06825993)" inkscape:original-d="m 14.028339,14.426828 c 0.34349,0.0054 0.461672,-0.652434 0.809187,-0.655134" inkscape:path-effect="#path-effect30-0-8-0-1" sodipodi:nodetypes="cc"/>
        </g>
        <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:0.573251px;line-height:0;font-family:Sans;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" x="23.273333" y="19.632013" id="text32-2-6-6-2-4" transform="scale(0.9960195,1.0039964)"><tspan sodipodi:role="line" id="tspan32-6-5-8-0-5" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.150478" x="23.273333" y="19.632013">K5</tspan></text>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 21.199699,20.303318 c 2.149432,-2.21e-4 2.149432,-2.21e-4 2.149432,-2.21e-4" id="path45-8-9-1"/>
        <g id="K5_NO" transform="matrix(0.68619666,0,0,0.69226905,13.448204,10.276168)" inkscape:label="K1_2" style="stroke-width:0.166979;stroke-dasharray:none">
            <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.166647;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 14.028339,14.426828 0.809187,-0.655134" id="path30-9-4-4-0-0" transform="matrix(1.0039941,0,0,1,0.28075764,0.06825993)" inkscape:original-d="m 14.028339,14.426828 c 0.34349,0.0054 0.461672,-0.652434 0.809187,-0.655134" inkscape:path-effect="#path-effect30-0-8-0-1-4" sodipodi:nodetypes="cc"/>
        </g>
        <ellipse style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.172814;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:0.172814, 0.172814;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="path34-16-2" cx="21.074305" cy="16.370449" rx="0.21330063" ry="0.20681809"/>
        <ellipse style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.172814;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:0.172814, 0.172814;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" id="path34-16-3" cx="21.06601" cy="20.255787" rx="0.21330063" ry="0.20681809"/>
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.115087;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 24.511542,20.303802 c 2.770871,0.0014 2.770871,0.0014 2.770871,0.0014" id="path46-8-29"/>
        <text xml:space="preserve" transform="scale(0.03)" id="text1" style="white-space:pre;shape-inside:url(#rect1);display:inline;fill:#000000"/>
        <path style="fill:#000000;stroke:#000000;stroke-width:0.115087;stroke-dasharray:none" d="M 24.057749,20.303017 H 23.313476" id="K5_NC" inkscape:label="vcc-dc-mppt"/>
        <path style="fill:#000000;fill-opacity:0;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;paint-order:fill markers stroke" d="m 13.497796,10.026557 0.0022,-0.036663 0.022,-0.043996 0.04693,-0.043995 0.04766,-0.018332 0.04693,-0.00293 0.04619,0.00953 0.04033,0.020531 0.03813,0.035929 0.0176,0.041796 0.0066,0.040329 z" id="path8"/>
        <path style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29-8-0" transform="matrix(0,-0.76981301,0.81563968,0,1.3913286,16.189009)" sodipodi:nodetypes="csc" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" inkscape:path-effect="#path-effect29-6-5"/>
        <path style="fill:#000000;fill-opacity:0;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;paint-order:fill markers stroke" d="m 13.498529,10.028757 0.03226,-0.085058 0.171582,-0.046928 0.09972,0.114388 0.01026,0.0198 z" id="path9"/>
        <path style="fill:#6e6e6e;fill-opacity:0.86859;stroke:none;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" d="m 13.494313,10.02839 0.01043,-0.048761 c 0,0 0.0183,-0.0695 0.09733,-0.09173 0.02216,-0.00623 0.0516,-0.012361 0.08222,-0.00517 0.02648,0.00622 0.06054,0.013942 0.08804,0.048506 0.01182,0.014864 0.01481,0.017675 0.02691,0.045689 0.006,0.013841 0.0092,0.023393 0.0092,0.023393 l 0.0029,0.02862" id="bulet_K1" sodipodi:nodetypes="ccsssscc"/>
        <path style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29-8-0-93" transform="matrix(0.76981301,0,0,0.81563968,10.093318,1.3056292)" sodipodi:nodetypes="csc" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" inkscape:path-effect="#path-effect29-6-5-2"/>
        <path style="fill:#6e6e6e;fill-opacity:0.86859;stroke:none;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" d="m 16.256748,13.408614 0.04876,0.01043 c 0,0 0.0695,0.0183 0.09173,0.09733 0.0062,0.02216 0.01236,0.0516 0.0052,0.08222 -0.0062,0.02648 -0.01394,0.06054 -0.04851,0.08804 -0.01486,0.01182 -0.01768,0.01481 -0.04569,0.02691 -0.01384,0.006 -0.02339,0.0092 -0.02339,0.0092 l -0.02862,0.0029" id="bulet_K2" sodipodi:nodetypes="ccsssscc" inkscape:label="bulet_K2"/>
        <path style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29-8-0-93-3-4" transform="matrix(0,-0.76981301,0.81563968,0,11.988472,22.589158)" sodipodi:nodetypes="csc" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" inkscape:path-effect="#path-effect29-6-5-2-7-4"/>
        <path style="fill:#6e6e6e;fill-opacity:0.86859;stroke:none;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" d="m 24.091457,16.425728 0.01043,-0.04876 c 0,0 0.0183,-0.0695 0.09733,-0.09173 0.02216,-0.0062 0.0516,-0.01236 0.08222,-0.0052 0.02648,0.0062 0.06054,0.01394 0.08804,0.04851 0.01182,0.01486 0.01481,0.01768 0.02691,0.04569 0.006,0.01384 0.0092,0.02339 0.0092,0.02339 l 0.0029,0.02862" id="bulet_K4" sodipodi:nodetypes="ccsssscc" inkscape:label="bulet_K2"/>
        <path style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.151209;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" d="m 8.0028091,14.765336 c 0.062991,2.3e-5 0.1257233,0.02305 0.1737678,0.06379 0.048044,0.04074 0.081019,0.09886 0.09134,0.161001 0.012804,0.07709 -0.010098,0.159376 -0.060887,0.218768 -0.050789,0.05939 -0.1285223,0.09479 -0.2066665,0.09411" id="path29-8-0-93-3-8" transform="matrix(0,-0.76981301,0.81563968,0,12.017534,26.521971)" sodipodi:nodetypes="csc" inkscape:original-d="m 8.0028091,14.765336 c 0.1006317,0.06843 0.1604501,0.156361 0.2651075,0.224791 0.1046571,0.06843 -0.1615545,0.213582 -0.2675535,0.312873" inkscape:path-effect="#path-effect29-6-5-2-7-2"/>
        <path style="fill:#6e6e6e;fill-opacity:0.86859;stroke:none;stroke-width:0;stroke-miterlimit:3.6;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" d="m 24.120519,20.358541 0.01043,-0.04876 c 0,0 0.0183,-0.0695 0.09733,-0.09173 0.02216,-0.0062 0.0516,-0.01236 0.08222,-0.0052 0.02648,0.0062 0.06054,0.01394 0.08804,0.04851 0.01182,0.01486 0.01481,0.01768 0.02691,0.04569 0.006,0.01384 0.0092,0.02339 0.0092,0.02339 l 0.0029,0.02862" id="bulet_K5" sodipodi:nodetypes="ccsssscc" inkscape:label="bulet_K2"/>
        </svg>
            `,
            }}
        />
    );
}
