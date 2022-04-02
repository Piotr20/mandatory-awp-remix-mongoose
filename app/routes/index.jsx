import { useLoaderData, Link } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export default function SnippetSidebar() {
  const snippets = useLoaderData();

  return (
    <div className="w-72">
      <ul>
        {snippets.map((snippet) => {
          return (
            <Link key={snippet._id} to={`/${snippet._id}`} className="font-bold hover:underline">
              <li className="p-4 border-b  border-r border-custom-black hover:bg-custom-beige cursor-pointer">
                {snippet.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
