import { makeSprite, t } from "@replay/core";

export const Menu = makeSprite({
    render({ props, getInputs, device }) {
        const inputs = getInputs();
    
        if (inputs.pointer.justReleased || inputs.keysJustPressed[""]) {
            props.start();
        }

        return [
            t.text({
                text: device.isTouchScreen
                ? "Tap to Start"
                : "Click or Space Bar to Start",
                color: "white",
                y: 100,
            }),
            t.text({
                text: `High score: ${props.highScore}`,
                font: { family: "Courier", size: 24 },
                color: "white",
                y: 150,
            }),
        ];
    },
});