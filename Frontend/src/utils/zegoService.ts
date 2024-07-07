import { useEffect } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAppSelector } from "../redux/store/store";
import { ReactNode } from "react";


export const ZegoCloud = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.UserSlice);

  useEffect(() => {
    const userID = user.id;
    const userName = user.name;
    const appID = 1874253558;
    const serverSecret = 'b20915d03efd29962f6e3dc9c4e02ac0';
    //@ts-ignore
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    // Add any additional setup or event handling here

  }, [user]);

  return children;
}

export default ZegoCloud;