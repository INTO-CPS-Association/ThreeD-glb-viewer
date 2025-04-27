import { gui } from "../lilgui";
import { renderCanvas } from "../main";

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

export const CanvasStyles: {
  [key: string]: {
    width: string;
    height: string;
    position: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    fullscreen: boolean;
  };
} = {};

const createDoubleClickListener = () => {
  window.addEventListener("dblclick", (e) => {
    //@ts-ignore
    const id = e.target?.id;
    const canvas = renderCanvas[id]?.canvas;
    if (!canvas) return;

    if (CanvasStyles[id]?.fullscreen) {
      gui.hide();
      canvas.style.width = CanvasStyles[id].width;
      canvas.style.height = CanvasStyles[id].height;
      canvas.style.position = CanvasStyles[id].position;
      canvas.style.top = CanvasStyles[id].top;
      canvas.style.bottom = CanvasStyles[id].bottom;
      canvas.style.left = CanvasStyles[id].left;
      canvas.style.right = CanvasStyles[id].right;
      CanvasStyles[id] = {
        ...CanvasStyles[id],
        fullscreen: false,
      };
    } else {
      gui.show();
      CanvasStyles[id] = {
        width: canvas.style.width,
        height: canvas.style.height,
        position: canvas.style.position,
        top: canvas.style.top,
        bottom: canvas.style.bottom,
        left: canvas.style.left,
        right: canvas.style.right,
        fullscreen: true,
      };
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.top = "0";
      canvas.style.bottom = "0";
      canvas.style.left = "0";
      canvas.style.right = "0";
      canvas.style.position = "absolute";
    }
  });
};

export { createDoubleClickListener };
