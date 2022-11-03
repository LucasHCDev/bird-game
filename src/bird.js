import { makeSprite, t } from "@replay/core";

export const birdWidth = 50;
export const birdHeight = 40;

export const Bird = makeSprite({
  render() {
    return [
      t.image({
        fileName: "frame-4.png",
        width: birdWidth,
        height: birdHeight,
      }),
      ];
  },
});
