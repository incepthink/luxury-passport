import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  wallet: string | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  connectWallet: (address?: string) => void;
  disconnectWallet: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("provance_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [wallet, setWallet] = useState<string | null>(() =>
    localStorage.getItem("provance_wallet"),
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("provance_user", JSON.stringify(user));
    else localStorage.removeItem("provance_user");
  }, [user]);

  useEffect(() => {
    if (wallet) localStorage.setItem("provance_wallet", wallet);
    else localStorage.removeItem("provance_wallet");
  }, [wallet]);

  const login = useCallback((email: string, _password: string) => {
    setUser({ name: email.split("@")[0], email });
  }, []);

  const signup = useCallback(
    (name: string, email: string, _password: string) => {
      setUser({ name, email });
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setWallet(null);
  }, []);

  const connectWallet = useCallback((address?: string) => {
    const addr =
      address ||
      "0x" +
        Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * 16).toString(16),
        ).join("");
    setWallet(addr);
  }, []);

  const disconnectWallet = useCallback(() => setWallet(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        wallet,
        login,
        signup,
        logout,
        connectWallet,
        disconnectWallet,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
