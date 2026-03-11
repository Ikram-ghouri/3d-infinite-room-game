import { useViverseActiveAvatar } from "@react-three/viverse";
import useWorld from "../hooks/userWorld";
import { SAMPLE_AVATAR } from "../../SampleData";

export const AvatarPicker = () => {
  const avatarList = useViverseActiveAvatar() || SAMPLE_AVATAR;
  console.log('Avatar List', avatarList);

  const avatar = useWorld((state) => state.avatar);
  const setAvatar = useWorld((state) => state.setAvatar);

  return avatarList.map((avatar) => (
    <div
      key={avatar.id}
      style={{
        width: '64px',
        height: '64px',
        margin: '4px',
        cursor: 'pointer',
      }}
      onClick={() => setAvatar(avatar)}
    >
      <img
        src={avatar.headIconUrl}
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
        }}
      />
    </div>
  ));
};
