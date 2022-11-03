import { makeSprite, t } from "@replay/core";
import { Level } from "./level";
import { Menu } from "./menu";

export const Game = makeSprite({
  init({ device, preloadFiles, updateState }) {
    Promise.all([
    device.storage.getItem("highScore"),
    preloadFiles({
      imageFileNames: ["frame-4.png"],
    }),
  ]).then(([highScore]) => {
      updateState((state) => {
        return {
          ...state,
          highScore: Number(highScore || "0"),
        };
      });
    });

    return {
      view: "loading",
      attempt: 0,
      highScore: 0,
    };
  },

  render({ state, updateState, device }) {
    if (state.view === "loading") {
      return [
        t.text({
          color: "black",
          text: "Loading...",
        }),
      ];
    }


    const inMenuScreen = state.view === "menu";

    return [
      Level({
        id: `level-${state.attempt}`,
        paused: inMenuScreen,
        gameOver: (score) => {
          updateState((prevState) => {
            let { highScore } = prevState;
            if (score > highScore) {
              highScore = score;
              device.storage.setItem("highScore", String(highScore));
            }
            return {
              ...prevState,
              view: "menu",
              highScore,
            };
          });
        },
      }),
      inMenuScreen
      ? Menu({
        id: "menu",
        highScore: state.highScore,
        start: () => {
          updateState((prevState) => {
            return {
              ...prevState,
              view: "Level",
              attempt: prevState.attempt + 1,
            };
          });
        },
      })
      : null,
      ];
  },
});

export const gameProps = {
  id: "Game",
  size: {
    width: 400,
    height: 600,
    maxHeightMargin: 150,
  },
  defaultFont: {
    family: "Helvetica",
    size: 24,
  },
};

export const options = {
  dimensions: "scale-up",
};

export const gameProps = {
  id: "Game",
  size: {
    landscape: {
      width: 600,
      height: 400,
      maxWidthMargin: 150,
    },
    portrait: {
      width: 400,
      height: 600,
      maxHeightMargin: 150,
    },
  },
  defaultFont: {
    family: "Courier",
    size: 10,
  },
};

export const Game = makeSprite({
  init({ updateState, preloadFiles }) {
    preloadFiles({
      audioFileNames: ["boop.wav"],
      imageFileNames: ["icon.png"],
    }).then(() => {
      updateState((state) => ({ ...state, loaded: true }));
    });

    return {
      loaded: false,
      posX: 0,
      posY: 0,
      targetX: 0,
      targetY: 0,
    };
  },

  loop({ state, device, getInputs }) {
    if (!state.loaded) return state;

    const { pointer } = getInputs();
    const { posX, posY } = state;
    let { targetX, targetY } = state;

    if (pointer.justPressed) {
      device.audio("boop.wav").play();
      targetX = pointer.x;
      targetY = pointer.y;
    }

    return {
      loaded: true,
      posX: posX + (targetX - posX) / 10,
      posY: posY + (targetY - posY) / 10,
      targetX,
      targetY,
    };
  },

  render({ state }) {
    if (!state.loaded) {
      return [
        t.text({
          text: "Loading...",
          color: "black",
        }),
      ];
    }
    return [
      t.text({
        color: "red",
        text: "Hello Replay! To get started, edit src/index.js",
        y: 50,
      }),
      t.image({
        testId: "icon",
        x: state.posX,
        y: state.posY,
        fileName: "icon.png",
        width: 50,
        height: 50,
      }),
    ];
  },
});
