export const allowedCategories = new Set(["Shipping", "Meals", "Software"]);

export const transactions = [
  {
    sourceId: "TX-1042",
    merchant: "Parcel Post",
    amount: "$18.40",
    suggestion: "Shipping",
  },
  {
    sourceId: "TX-1043",
    merchant: "Northside Café",
    amount: "$26.00",
    suggestion: "Meals",
  },
  {
    sourceId: "TX-1044",
    merchant: "Cloud Ledger",
    amount: "$49.00",
    suggestion: "Cloud tools",
  },
];

const importableRows = transactions.filter(({ suggestion }) =>
  allowedCategories.has(suggestion),
);

type DemoState = {
  phase: "review" | "ready" | "interrupted" | "complete";
  savedRows: typeof transactions;
  skippedRows: number;
};

export const initialState: DemoState = {
  phase: "review",
  savedRows: [],
  skippedRows: 0,
};

export function advanceDemo(state: DemoState): DemoState {
  switch (state.phase) {
    case "review":
      return { ...state, phase: "ready" };
    case "ready":
      return {
        ...state,
        phase: "interrupted",
        savedRows: importableRows.slice(0, 1),
      };
    case "interrupted": {
      const savedIds = new Set(state.savedRows.map(({ sourceId }) => sourceId));
      const newRows = importableRows.filter(
        ({ sourceId }) => !savedIds.has(sourceId),
      );
      return {
        phase: "complete",
        savedRows: [...state.savedRows, ...newRows],
        skippedRows: importableRows.length - newRows.length,
      };
    }
    case "complete":
      return initialState;
  }
}
