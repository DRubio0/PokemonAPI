import { Waveform } from "@uiball/loaders";

export default function Loader() {
  return (
    <div className="container-loader">
      <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
    </div>
  );
}
