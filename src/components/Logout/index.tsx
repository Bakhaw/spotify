import { signOut } from "next-auth/react";

const Logout: React.FC = () => {
  async function handleButtonClick() {
    await signOut();
  }

  return <button onClick={handleButtonClick}>Log out</button>;
};

export default Logout;
