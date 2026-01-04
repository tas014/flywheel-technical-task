import Image from "next/image";
import Logo from "@/public/flywheel_logo.png";
import Franco from "@/public/Franco.jpg";

export default function Footer() {
  return (
    <footer className="flex place-content-center bg-(--background-soft) p-8">
      <section className="flex gap-15 justify-center items-center">
        <div className="flex items-center justify-center">
          <div className="grid place-content-center">
            <Image
              className="rounded-full w-40 h-fit"
              src={Franco}
              alt="A photo of Franco, this site's developer"
            />
          </div>
          <a
            href="https://github.com/tas014/flywheel-technical-task/blob/main/README.md"
            target="_blank"
            className="px-16 py-8 mx-16 border border-t-0 border-b-0 text-center underline"
          >
            Project Documentation
          </a>
          <div className="grid place-content-center">
            <Image
              src={Logo}
              alt="Flhywheel Studio logo"
              className="w-64 h-fit"
            />
          </div>
        </div>
      </section>
    </footer>
  );
}
