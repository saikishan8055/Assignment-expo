import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProfileType = {
  name: string;
  email: string;
  avatar: string;
};

type ProfileContextType = {
  profile: ProfileType;
  updateProfile: (data: Partial<ProfileType>) => void;
};

const defaultProfile = {
  name: 'Sai kishan',
  email: 'Saikishan4341@gmail.com',
  avatar: 'https://i.pravatar.cc/100',
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileType>(defaultProfile);

  const updateProfile = (data: Partial<ProfileType>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);