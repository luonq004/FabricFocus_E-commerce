import React from "react";
import ProfilePageModern from "./_components/ProfileUser";

const ProfilePage = () => {
  React.useEffect(() => {
    document.title = "Thông Tin Cá Nhân";
  }, []);
  return (
    <div>
      <ProfilePageModern />
    </div>
  );
};

export default ProfilePage;
