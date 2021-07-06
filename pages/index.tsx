import { useDeno } from "framework/react";
import React from "react";
import "../style/index.css";
import { microcmsClient } from "../lib/microcmsClient.ts";

type content = {
  "id": string;
  "createdAt": string;
  "updatedAt": string;
  "publishedAt": string;
  "revisedAt": string;
  "title": string;
  "body": string;
};

export default function Home() {
  const articles = useDeno(async () => {
    return await microcmsClient.get<[content]>({
      endpoint: "blog",
      queries: { limit: 99 },
    });
  });

  return (
    <div className="page">
      <head>
        <title>aleph memo</title>
      </head>
      <section>
        {articles.contents.map((content: content) => {
          return (
            <React.Fragment key={content.id}>
              <article>
                <h2 className="rgb">
                  {content.title}
                </h2>
                <p>{content.createdAt.slice(0, 10)}</p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: `${content.body}`,
                  }}
                />
              </article>
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
}
