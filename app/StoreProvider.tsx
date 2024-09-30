"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store"; // Import the pre-configured store

export default function StoreProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
