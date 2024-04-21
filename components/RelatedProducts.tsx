import { RelatedProducts } from "@algolia/recommend-react";
import recommend from "@algolia/recommend";

const recommendClient = recommend(
  "61K89SD3KF",
  "aca5cb2a6d51386a56dc1e10517e8554"
);
const indexName = "merged";

function RelatedItem({ item }: any) {
  return (
    <pre>
      <code>{JSON.stringify(item)}</code>
    </pre>
  );
}

function App({ currentObjectID }: { currentObjectID: string }) {
  return (
    <RelatedProducts
      recommendClient={recommendClient}
      indexName={indexName}
      objectIDs={[currentObjectID]}
      itemComponent={RelatedItem}
    />
  );
}
