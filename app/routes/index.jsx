import { useLoaderData, Outlet, Link } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export default function Index() {
  const snippets = useLoaderData();

  return (
    <div className="w-64">
      <ul>
        {snippets.map((snippet) => {
          return (
            <li
              className="p-4 border-b  border-r border-custom-black hover:bg-gray-200 cursor-pointer"
              key={snippet._id}
            >
              <Link to={`/snippets/${snippet._id}`} className="font-bold hover:underline">
                {snippet.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
