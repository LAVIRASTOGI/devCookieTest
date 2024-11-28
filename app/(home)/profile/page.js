"use client";

import Loading from "@/app/loading";

import { useUser } from "@/contexts/userContext";

import dynamic from "next/dynamic";

const ProfileDetails = dynamic(() => import("@/components/ProfileDetails"), {
  loading: () => <Loading />,
});
function ProfilePage() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <ProfileDetails userData={user} />
      ) : (
        <div className="h-[30vh]  md:h-[82vh]"></div>
      )}
    </>
  );
}

export default ProfilePage;
