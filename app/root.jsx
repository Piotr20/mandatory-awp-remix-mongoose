import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Form,
  useSearchParams,
} from "remix";
import { useState } from "react";
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
  const [searchResult, setSearchResult] = useState("");
  const [params] = useSearchParams();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 text-slate-800 font-sans flex h-screen overflow-hidden">
        <header className=" max-w-xs mb-4 border-b-2 h-screen flex flex-col items-center bg-custom-black text-white py-4 px-8 text-base">
          <Link
            to="/new"
            className="hover:underline mt-1 bg-white text-custom-black font-bold w-full whitespace-nowrap px-3 py-1 rounded-2xl text-center"
          >
            + Add Snippet
          </Link>
          <h2 className="w-2/3 text-xl pb-1 mb-2 mt-16 border-b text-center">
            Folders
          </h2>
          <Link to="/" className="hover:underline mt-2 text-center">
            All
          </Link>
          <Link
            to="/?directory=javascript"
            className="hover:underline mt-2 text-center "
          >
            JavaScript
          </Link>
          <Link
            to="/?directory=php"
            className="hover:underline mt-2 text-center "
          >
            Php
          </Link>
          <Link
            to="/?directory=jsx"
            className="hover:underline mt-2 text-center "
          >
            React
          </Link>
          <Link
            to="/?directory=vue"
            className="hover:underline mt-2 text-center "
          >
            Vue
          </Link>
          <Link
            to="/?directory=angular"
            className="hover:underline mt-2 text-center "
          >
            Angular
          </Link>
          <Link
            to="/?directory=node"
            className="hover:underline mt-2 text-center "
          >
            Node
          </Link>
          <Link
            to="/?directory=rust"
            className="hover:underline mt-2 text-center "
          >
            Rust
          </Link>
          <Link
            to="/?directory=Another"
            className="hover:underline mt-2 text-center "
          >
            Other
          </Link>
        </header>
        <section className="flex-col w-full">
          <div className="w-full flex items-center py-5 px-8 bg-custom-beige shadow-md">
            <Form className="w-64 flex">
              <select
                defaultValue={null}
                name="sortBy"
                id="sorting"
                className=" border flex-grow border-custom-black  px-2 py-1 font-semibold text-base"
              >
                <option value={null}>Sort by</option>
                <option value="title">Sort by: title</option>

                <option value="creationDate">Sort by: created at</option>
                <option value="favorite">Sort by: favorite</option>
              </select>
              <button
                type="submit"
                className="ml-1 px-6 py-1 text-md border border-custom-black text-base bg-white font-semibold hover:bg-custom-black hover:text-white transition-colors duration-200"
              >
                Sort
              </button>
            </Form>
            <Form className="ml-4">
              <input
                type="text"
                name="query"
                placeholder="Search snippets..."
                defaultValue={params.get("query")}
                className=" border border-custom-black  px-2 py-1 w-72"
              />
            </Form>
          </div>
          <div className="w-full">
            <Outlet context={searchResult} />
          </div>
        </section>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
