import { Links, Link, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 text-slate-800 font-sans flex">
        <header className=" mb-4 border-b-2 h-screen flex flex-col bg-custom-black text-white py-4 px-8 text-base">
          <h2 className=" text-2xl pb-1 mb-1 border-b-2">Folders</h2>
          <Link to="/" className="hover:underline ">
            Home
          </Link>
          <Link to="/books/new" className="hover:underline ">
            New book
          </Link>
        </header>
        <section className="flex-col w-full">
          <div className="w-full flex items-center py-4 px-8 bg-custom-beige">Text</div>
          <Outlet />
        </section>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
