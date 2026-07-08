import { Image } from "react-native";

import typoLogo from "@/assets/images/typoLogo.png";

import { HeaderContainer } from "./HeaderContainer";

export type LogoHeaderProps = {
  className?: string;
};

export function LogoHeader({ className }: LogoHeaderProps) {
  return (
    <HeaderContainer className={className}>
      <Image source={typoLogo} className="h-6 w-[108px]" resizeMode="contain" />
    </HeaderContainer>
  );
}
