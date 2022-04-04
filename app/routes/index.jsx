import { useLoaderData, Link, useSearchParams } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ request, params }) {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();

  return snippets;
}

export default function SnippetSidebar() {
  const snippets = useLoaderData();
  const [params] = useSearchParams();
  const searchValue = params.get("query");
  const sortBy = params.get("sortBy");
  const directory = params.get("directory");

  const filteredSnippets = snippets
    .sort((a, b) => {
      if (sortBy === null || sortBy === undefined) {
        return 0;
      }
      if (sortBy === "title") {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      }
      if (sortBy === "creationDate") {
        return a.createdAt > b.createdAt ? 1 : -1;
      }
      if (sortBy === "favorite") {
        return a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1;
      }
    })
    .filter((dir) => {
      if (directory == null) {
        return dir;
      }
      if (dir.language === directory) {
        return dir;
      }
    })
    .filter((snippet) => {
      if (searchValue === null) {
        return snippet;
      }
      //return the item which contains the user input
      else {
        return snippet.title.toLowerCase().includes(searchValue);
      }
    });
  return (
    <div className=" min-w-xs max-w-xs">
      <ul>
        {filteredSnippets.map((snippet) => {
          return (
            <Link key={snippet._id} to={`/${snippet._id}?${params}`} className="font-bold group ">
              <li className="p-4 px-8 border-b  border-r border-custom-black hover:bg-custom-beige cursor-pointer">
                <span className="text-xs font-normal">
                  {snippet.date.split("-")[2] +
                    " " +
                    snippet.date.split("-")[1] +
                    " " +
                    snippet.date.split("-")[0]}
                </span>
                <h2 className=" text-xl group-hover:underline max-w-full whitespace-nowrap text-ellipsis overflow-hidden">
                  {snippet.title}
                </h2>
                <p className=" text-sm  opacity-60 font-normal max-w-full whitespace-nowrap text-ellipsis overflow-hidden">
                  {snippet.description}
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
