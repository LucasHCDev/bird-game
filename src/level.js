import { makeSprite } from "@replay/core";
import { Bird } from "./bird";

const birdx = 0;

export const Level = makeSprite({
  init() {
    return {
      birdY: 10,
      birdGravity: -12,
    };  
  },
  
  render({ state }) {
    return [
      Bird({
        id: "bird",
        x: birdX,
        y: state.birdY,
      }),
    ];
  },
});
