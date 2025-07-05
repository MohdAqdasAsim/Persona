import { db } from "@/services/config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  hasProfile: boolean;
  user: User | null;
  name: string | null;
  profileImage: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  hasProfile: false,
  user: null,
  name: null,
  profileImage: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const authInstance = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);

        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setHasProfile(true);
            const userData = userDoc.data();
            setName(userData?.name || null);
            setProfileImage(userData?.profileImage || null);
          } else {
            setHasProfile(false);
            setName(null);
            setProfileImage(null);
          }
        } catch (error) {
          console.error("Error checking user profile:", error);
          setHasProfile(false);
          setName(null);
          setProfileImage(null);
        }
      } else {
        setIsLoggedIn(false);
        setHasProfile(false);
        setUser(null);
        setName(null);
        setProfileImage(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, hasProfile, user, name, profileImage, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
