import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div>
      <p className={`${titleFont.className} font-medium`}>Hola mundo</p>
      <p className={`${titleFont.className} font-light`}>Hola mundo</p>
    </div>
  );
}
