import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";

import Container from "~/components/Container";
import {
  advanceDemo,
  allowedCategories,
  initialState,
  transactions,
} from "~/demos/waystone";
import { buildHeader } from "~/utils";

export const meta: MetaFunction = () =>
  buildHeader({
    pageTitle: "Waystone transaction import demo",
    description:
      "Review sample AI category suggestions and retry an interrupted transaction import.",
    url: "https://brianmorrison.me/demos/waystone",
  });

const actionLabels = {
  review: "Reject invalid suggestion",
  ready: "Import and interrupt acknowledgement",
  interrupted: "Retry the same batch",
  complete: "Reset demo",
};

export default function WaystoneDemo() {
  const [demo, setDemo] = useState(initialState);
  const status = {
    review:
      "“Cloud tools” is outside the destination’s category list. Reject that suggestion to import the other two rows.",
    ready:
      "TX-1044 is excluded. The next step saves the first valid row and interrupts the acknowledgement to the worker.",
    interrupted:
      "The destination saved TX-1042. The worker lost the acknowledgement, so it can’t tell whether the write succeeded.",
    complete: `The destination recognized ${demo.skippedRows} saved source ID on replay. Both valid transactions are now saved once each.`,
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white md:m-8 rounded-xl">
      <Container>
        <article className="blog-post">
          <header>
            <h1>Waystone transaction import demo</h1>
            <p>
              Review AI category suggestions, interrupt a write acknowledgement,
              and retry the import. This walkthrough runs in your browser with
              fictional transactions and preset suggestions.
            </p>
          </header>

          <section aria-labelledby="incoming-batch">
            <h2 id="incoming-batch">Incoming batch</h2>
            <p>
              Accepted categories are {Array.from(allowedCategories).join(", ")}
              .
            </p>
            <div className="overflow-x-auto rounded-lg border bg-white">
              <table
                aria-labelledby="incoming-batch"
                className="w-full text-left text-sm sm:text-base"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2">
                      Source ID
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Transaction
                    </th>
                    <th scope="col" className="px-3 py-2">
                      AI suggestion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(
                    ({ sourceId, merchant, amount, suggestion }) => (
                      <tr key={sourceId} className="border-t">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-3 py-2 font-normal"
                        >
                          {sourceId}
                        </th>
                        <td className="px-3 py-2">
                          {merchant}
                          <span className="block text-gray-600">{amount}</span>
                        </td>
                        <td className="px-3 py-2">
                          {suggestion}
                          {!allowedCategories.has(suggestion) && (
                            <span className="block text-red-800">
                              {demo.phase === "review"
                                ? "Unsupported"
                                : "Rejected"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-lg border bg-white p-4">
              <p role="status" className="text-base">
                {status[demo.phase]}
              </p>
              <button
                type="button"
                onClick={() => setDemo(advanceDemo)}
                className="rounded bg-gray-900 px-4 py-2 text-left font-semibold text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {actionLabels[demo.phase]}
              </button>
            </div>
          </section>

          <section aria-labelledby="saved-rows">
            <h2 id="saved-rows">Saved rows ({demo.savedRows.length})</h2>
            <p>
              The destination uses the source ID to recognize a transaction it
              already saved.
            </p>
            <div className="overflow-x-auto rounded-lg border bg-white">
              <table
                aria-labelledby="saved-rows"
                className="w-full text-left text-sm sm:text-base"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2">
                      Source ID
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Transaction
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {demo.savedRows.length === 0 && (
                    <tr className="border-t">
                      <td colSpan={3} className="px-3 py-2 text-gray-600">
                        No transactions saved yet.
                      </td>
                    </tr>
                  )}
                  {demo.savedRows.map(
                    ({ sourceId, merchant, amount, suggestion }) => (
                      <tr key={sourceId} className="border-t">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-3 py-2 font-normal"
                        >
                          {sourceId}
                        </th>
                        <td className="px-3 py-2">
                          {merchant}
                          <span className="block text-gray-600">{amount}</span>
                        </td>
                        <td className="px-3 py-2">{suggestion}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-6">
            <Link to="/portfolio/waystone">
              Back to the Waystone case study
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}
