import { useLoaderData, useCatch, json, Outlet } from "remix";
import connectDb from "~/db/connectDb.server.js";
import SnippetSidebar from "./index";

export async function loader({ params }) {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export default function BookPage() {
  const smippets = useLoaderData();
  return (
    <div className="flex w-full">
      <SnippetSidebar />
      <div className="p-4 flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
