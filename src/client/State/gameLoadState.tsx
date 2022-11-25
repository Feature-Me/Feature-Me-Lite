import { atom } from "recoil";

const gameLoadState = atom<boolean>({
    key: "gameLoadeState",
    default: false,
})

export default gameLoadState;