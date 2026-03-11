import { useGLTF } from "@react-three/drei";
import { GameDashboard } from "@react-three/viverse";
import PocketBase from "pocketbase";
import { Vector3 } from "three";
import { create } from "zustand";
import { SAMPLE_AVATAR } from "../../SampleData";

export const GRID_CELL_SIZE = 14.88;
export const HALF_GRID_CELL_SIZE = GRID_CELL_SIZE / 2;

const pb = new PocketBase("https://pocketbase-u4.vm.elestio.app");

    export const poses = [
    {
    name: "KungFu",
    thumbnail: "images/Kung Fu Pose.webp",
    url: "/animations/KungFu.glb",
  },
  {
    name: "Dance",
    thumbnail: "images/Dance Pose.webp",
    url: "/animations/Dance.glb",
  },
  {
    name: "Musclor",
    thumbnail: "images/Musclor Pose.webp",
    url: "/animations/Musclor.glb",
  },
  {
    name: "Sitting",
    thumbnail: "images/Sitting Pose.webp",
    url: "/animations/Sitting.glb",
  },
  {
    name: "Standing",
    thumbnail: "images/Standing Pose.webp",
    url: "/animations/Standing.glb",
  },
  {
    name: "Superman",
    thumbnail: "images/Superman Pose.webp",
    url: "/animations/Superman.glb",
  },
];

export const items = [
  {
    name: "Chicken",
    thumbnail: "models/items/Chicken.webp",
    model: "models/items/Chicken.glb",
    attribution: "Chicken by jeremy [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/1YE8U35HXsI",
    bone: "head",
    scale: 0.002,
    position: [0.0, 0.05, -0.05],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Heart",
    thumbnail: "models/items/Heart.webp",
    model: "models/items/Heart.glb",
    attribution: "Heart by Poly by Google [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/8RA5hHU5gHK",
    bone: "rightEye",
    scale: 0.0004,
    position: [0, 0, -0.07],
    rotation: [0, 0, 0],
  },
  {
    name: "Star",
    thumbnail: "models/items/Star.webp",
    model: "models/items/Star.glb",
    attribution: "Star by Poly by Google [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/9NXf-SDxJny",
    bone: "head",
    scale: 0.1,
    position: [0.0, 0.3, 0],
    rotation: [0, 0, 0],
  },
  {
    name: "Rainbow With Clouds",
    thumbnail: "models/items/Rainbow With Clouds.webp",
    model: "models/items/Rainbow With Clouds.glb",
    attribution: "Rainbow With Clouds by mehreen1919 [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/aHumAbJCsK",
    bone: "head",
    scale: 8,
    position: [0.0, 0.2, 0.2],
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    name: "Pirate Hook",
    thumbnail: "models/items/Pirate hook.webp",
    model: "models/items/Pirate hook.glb",
    attribution: "Pirate hook by Poly by Google [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/ay-W1oYUF-x",
    bone: "leftHand",
    scale: 0.002,
    position: [0, 0, 0],
    rotation: [-Math.PI / 3, 0, Math.PI / 2],
  },
  {
    name: "Pirate Hat",
    thumbnail: "models/items/Pirate hat.webp",
    model: "models/items/Pirate hat.glb",
    attribution: "Pirate hat by Poly by Google [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/9QEds6cYAy6",
    bone: "head",
    scale: 0.05,
    position: [0, 0.16, -0.01],
    rotation: [0, 0.5, 0],
  },
  {
    name: "Staff",
    thumbnail: "models/items/Staff.webp",
    model: "models/items/Staff.glb",
    attribution: "Staff by Zsky [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/PE1OrCnscj",
    bone: "rightHand",
    scale: 0.1,
    position: [0.1, 0, -0.5],
    rotation: [-Math.PI / 2, 0, 0],
  },
  {
    name: "Toco Toucan",
    thumbnail: "models/items/Toco Toucan.webp",
    model: "models/items/Toco Toucan.glb",
    attribution: "Toco Toucan by Anonymous [CC-BY] via Poly Pizza",
    attributionLink: "https://poly.pizza/m/fFVqukPnc62",
    bone: "leftShoulder",
    scale: 0.6,
    position: [-0.08, 0.02, 0],
    rotation: [0, Math.PI, -0.4],
  },
];

export const themes = [
  { name: "Dreamy", from: "#9796f0", to: "#fbc7d4" },
  { name: "Windy", from: "#acb6e5", to: "#86fde8" },
  { name: "Mango", from: "#ffe259", to: "#ffa751" },
  { name: "Ocean View", to: "#a8c0ff", from: "#3f2b96" },
  { name: "Pun Yeta", from: "#108dc7", to: "#ef8e38" },
  { name: "Forest", from: "#5A3F37", to: "#2C7744" },
  { name: "Lavender", from: "#B24592", to: "#F15F79" },
  { name: "Black", from: "#555", to: "#333" },
  { name: "white", from: "#CCC", to: "#FFF" },
];

poses.forEach((pose) => {
  useGLTF.preload(pose.url);
});

const userWorld = create((set, get) => ({
  avatar: SAMPLE_AVATAR[0],
  setAvatar: (avatar) => set({ avatar }),
  pose: poses[0],
  setPose: (pose) => set({ pose }),
  item: null,
  setItem: (item) => set({ item }),
  theme: themes[0],
  setTheme: (theme) => set({ theme }),
  characterPosition: new Vector3(0, 0, 0),
  gridPosition: { x: 0, y: 0 },
  gridSize: { x: 3, y: 3 },
  mode: "explore", // "explore" | "photo"
  hoveredFrame: null,
  setHoveredFrame: (frame) => {
    if (get().mode === "photo") {
      return; // Do not allow changing hoveredFrame in photo mode
    }
    if (frame) {
      audios["action"].play();
    }
    set({ hoveredFrame: frame });
  },
  setMode: (mode) => {
    if (mode === "photo") {
      audios["switchMode"].play();
      audios["ambientMusic"].pause();
      audios["photoBoothMusic"].currentTime = 0;
      audios["photoBoothMusic"].play();
    } else {
      audios["photoBoothMusic"].pause();
      audios["ambientMusic"].currentTime = 0;
      audios["ambientMusic"].play();
    }
    set({ mode });
  },

  computeCharacterCell: (position) => {
    const newCellX = Math.floor(
      (position.x + HALF_GRID_CELL_SIZE) / GRID_CELL_SIZE
    );
    const newCellZ = Math.floor(
      (position.z + HALF_GRID_CELL_SIZE) / GRID_CELL_SIZE
    );
    const { gridPosition } = get();
    if (newCellX !== gridPosition.x || newCellZ !== gridPosition.y) {
      console.log("New Cell:", newCellX, newCellZ);
      set({ gridPosition: { x: newCellX, y: newCellZ } });
    }
    get().characterPosition.copy(position);
  },
  gl: null,
  setGl: (gl) => set({ gl }),
  uploading: false,
  saveScreenshotAndUpload: async (profile) => {
    const gl = get().gl;
    if (!gl) {
      console.warn("WebGL context not set");
      return;
    }
    set({ uploading: true });
    audios["shutter"].play();
    const screenshotCanvas = document.createElement("canvas");

    const size = Math.min(gl.domElement.width, gl.domElement.height);

    const sizeOutput = Math.min(size, 1024);
    const offsetX = (gl.domElement.width - size) / 2;
    const offsetY = (gl.domElement.height - size) / 2;

    screenshotCanvas.width = sizeOutput;
    screenshotCanvas.height = sizeOutput;
    const overlayCtx = screenshotCanvas.getContext("2d");
    if (!overlayCtx) {
      return;
    }
    // Draw the center square portion of the rendered image
    overlayCtx.drawImage(
      gl.domElement,
      offsetX,
      offsetY,
      size,
      size,
      0,
      0,
      sizeOutput,
      sizeOutput
    );

    // Convert canvas to blob
    screenshotCanvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Failed to create blob from canvas");
        return;
      }

      // Create a File object from the blob
      const date = new Date();
      const filename = `Avatar_${
        date.toISOString().split("T")[0]
      }_${date.toLocaleTimeString()}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      // Create FormData and append all fields
      const formData = new FormData();
      formData.append("cellX", get().gridPosition.x);
      formData.append("cellY", get().gridPosition.y);
      formData.append("frame", get().hoveredFrame);
      formData.append("username", profile.name);
      formData.append("headIconUrl", profile.activeAvatar.headIconUrl);
      formData.append("photo", file); // Add the screenshot file

      // Send to PocketBase
      try {
        const record = await pb.collection("ViversePhotos").create(formData);
        console.log("Photo uploaded successfully:", record);
      } catch (error) {
        console.error("Failed to upload photo:", error);
      }
      set({ hoveredFrame: null, uploading: false });
      get().setMode("explore");
    }, "image/png");

    // Save to leaderboard
    get().saveToLeaderboard();
  },
  menuPanelOpened: null,
  setMenuPanelOpened: (panel) => {
    const curPanel = get().menuPanelOpened;
    set({ menuPanelOpened: curPanel === panel ? null : panel }); // Toggle if same panel
  },
  photos: {},
  loadPhotos: async () => {
    const records = await pb.collection("ViversePhotos").getFullList({});

    const orderedPhotos = {};
    records.forEach((photo) => {
      const key = `${photo.cellX},${photo.cellY}`;
      if (!orderedPhotos[key]) {
        orderedPhotos[key] = [];
      }
      photo.photoUrl = pb.files.getURL(photo, photo.photo);
      orderedPhotos[key].push(photo);
    });

    console.log("Loaded photos:", orderedPhotos);
    set({ photos: orderedPhotos });
  },
  gameDashboard: null,
  setupGameDashboard: (authToken) => {
    if (!import.meta.env.VITE_VIVERSE_APP_ID) {
      console.warn("VIVEPORT_APP_ID is not set");
      return;
    }
    const gameDashboard = new GameDashboard({
      baseURL: "https://www.viveport.com/",
      communityBaseURL: "https://www.viverse.com/",
      token: authToken,
    });
    set({ gameDashboard });
    get().loadLeaderboard();
  },
  saveToLeaderboard: async () => {
    if (!get().gameDashboard) {
      console.warn("GameDashboard not initialized");
      return;
    }
    const scores = [{ name: "photosTaken", value: 1 }];

    const uploadedScore = await get().gameDashboard.uploadLeaderboardScore(
      import.meta.env.VITE_VIVERSE_APP_ID,
      scores
    );
    console.log("Uploaded score:", uploadedScore);
    get().loadLeaderboard();
  },
  leaderboard: null,
  loadLeaderboard: async () => {
    if (!get().gameDashboard) {
      console.warn("GameDashboard not initialized");
      return;
    }
    const leaderboardConfig = {
      name: "photosTaken", // string
      range_start: 0, // number, show number of users beyond user's rank
      range_end: 100, // number, show number of users below user's rank
      region: "global", // string, get by local/global
      time_range: "alltime",
      around_user: false,
    };

    const leaderboard = await get().gameDashboard.getLeaderboard(
      import.meta.env.VITE_VIVERSE_APP_ID,
      leaderboardConfig
    );
    set({ leaderboard });
  },
}));

userWorld.getState().loadPhotos();

pb.collection("ViversePhotos").subscribe(
  "*",
  function (e) {
    userWorld.getState().loadPhotos();
  },
  {}
);

const audios = {
  action: new Audio("audios/action.mp3"),
  shutter: new Audio("audios/shutter.mp3"),
  switchMode: new Audio("audios/switch-mode.mp3"),
  ambientMusic: new Audio("audios/ambient-music.mp3"),
  photoBoothMusic: new Audio("audios/photobooth-music.mp3"),
};

audios.ambientMusic.loop = true;
audios.photoBoothMusic.loop = true;

document.addEventListener(
  "click",
  () => {
    audios.ambientMusic.play();
  },
  { once: true }
);

export default userWorld;
