import { ReactComponent as BaseLoginIcon } from "../../assets/login.svg";
import { ReactComponent as BaseLogoutIcon } from "../../assets/logout.svg";
import { ReactComponent as BaseMembersIcon } from "../../assets/members.svg";
import { ReactComponent as BaseMoviesIcon } from "../../assets/movies.svg";
import { ReactComponent as BaseUsersIcon } from "../../assets/users.svg";
import React, { FunctionComponent, SVGProps } from "react";

// Define a type for the IconComponent props
type IconComponentProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

// Define a type for the CustomIcon props
type CustomIconProps = IconComponentProps & {
  isActive?: boolean;
  isHovered?: boolean;
};

// Higher-order component to create a custom icon with hover and active fill colors
const withCustomIcon = (
  IconComponent: FunctionComponent<IconComponentProps>
): FunctionComponent<CustomIconProps> => {
  const CustomIcon: FunctionComponent<CustomIconProps> = ({
    isActive,
    isHovered,
    ...props
  }) => {
    const activeClasses = isActive ? "fill-blue-700" : "fill-gray-500";
    const hoverClasses = isHovered ? "fill-blue-700" : "";
    const defaultClasses = "w-6 h-6 transition-colors duration-200";

    return (
      <IconComponent
        className={`${activeClasses} ${hoverClasses} ${defaultClasses}`}
        {...props}
      />
    );
  };

  return CustomIcon;
};

const LoginIcon = withCustomIcon(BaseLoginIcon);
const LogoutIcon = withCustomIcon(BaseLogoutIcon);
const MembersIcon = withCustomIcon(BaseMembersIcon);
const MoviesIcon = withCustomIcon(BaseMoviesIcon);
const UsersIcon = withCustomIcon(BaseUsersIcon);

export { LoginIcon, LogoutIcon, MembersIcon, MoviesIcon, UsersIcon };
