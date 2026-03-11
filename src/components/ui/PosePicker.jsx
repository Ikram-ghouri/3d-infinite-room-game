import { MdEmojiPeople } from "react-icons/md";
import userWorld, { poses } from "../hooks/userWorld";
import { MenuPanel } from "./MenuPanel";

export function PosePicker() {
  const posePickerOpened =
    userWorld((state) => state.menuPanelOpened) === "pose";
  const setMenuPanelOpened = userWorld((state) => state.setMenuPanelOpened);
  const currentPose = userWorld((state) => state.pose);
  const setPose = userWorld((state) => state.setPose);

  return (
    <div className="z-10 fixed bottom-4 left-4 flex gap-4">
      <MenuPanel
        title={
          <>
            <MdEmojiPeople />
            Pose Picker
          </>
        }
        description="Choose the best pose for your photo."
        visible={posePickerOpened}
        onClose={() => setMenuPanelOpened(null)}
      >
        <div className="grid grid-cols-3 gap-4 p-4">
          {poses?.map((pose, idx) => (
            <div
              key={idx}
              className={`cursor-pointer rounded-2xl bg-gray-500/50 overflow-hidden border border-zinc-300/30 transition-all duration-300 p-2 flex flex-col gap-2 text-center ${
                pose.name === currentPose?.name
                  ? "ring-2 ring-white"
                  : "opacity-80 hover:opacity-100"
              }`}
              onClick={() => setPose(pose)}
            >
              <img
                src={pose.thumbnail}
                className="w-full aspect-square object-cover rounded-2xl"
              />
              <span className="text-sm font-bold">{pose.name}</span>
            </div>
          ))}
        </div>
      </MenuPanel>
    </div>
  );
}
