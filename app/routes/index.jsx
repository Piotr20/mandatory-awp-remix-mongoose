import { useLoaderData, Link } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Book.find();
  return snippets;
}

export default function Index() {
  const snippets = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Remix + Mongoose</h1>
      <h2 className="text-lg font-bold mb-3">Here are a few of my favorite books:</h2>
      <ul className="ml-5 list-disc">
        {snippets.map((snippet) => {
          return (
            <li key={snippet._id}>
              <Link to={`/books/${snippet._id}`} className="text-blue-600 hover:underline">
                {snippet.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
