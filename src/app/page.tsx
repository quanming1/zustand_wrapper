/* eslint-disable @typescript-eslint/no-explicit-any */
import AutoSubscribeDemo from "@/components/AutoSubscribeDemo";
import PartialSubscribeDemo from "@/components/PartialSubscribeDemo";
import ComplexStoreDemo from "@/components/ComplexStoreDemo";

export default function Home() {
  return (
    <div className="space-y-8">
      <AutoSubscribeDemo />
      <PartialSubscribeDemo />
      <ComplexStoreDemo />
    </div>
  );
}
