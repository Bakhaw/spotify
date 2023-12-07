import { signOut } from "next-auth/react";

const Logout: React.FC = () => {
  async function handleButtonClick() {
    await signOut();
  }

  return <button onClick={handleButtonClick}>Sign out</button>;
};

export default Logout;
