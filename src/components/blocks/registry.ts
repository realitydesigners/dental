import { BlockRegistry } from "./types";

const blockRegistry: BlockRegistry = {};

export function registerBlock(
  type: string,
  component: React.ComponentType<any>,
  schema: any,
  query: { fragment: string; dependencies?: string[] },
) {
  if (blockRegistry[type]) {
    console.warn(
      `Block type "${type}" is already registered. It will be overwritten.`,
    );
  }

  blockRegistry[type] = {
    component,
    schema,
    query,
  };
}

export function getBlock(type: string) {
  const block = blockRegistry[type];
  if (!block) {
    throw new Error(`Block type "${type}" not found in registry`);
  }
  return block;
}

export function getAllBlocks() {
  return blockRegistry;
}

export function getAllSchemas() {
  return Object.values(blockRegistry).map((block) => block.schema);
}

export function getAllQueryFragments() {
  return Object.values(blockRegistry).map((block) => block.query);
}

// Helper to compose GROQ query from registered blocks
export function composeBlocksQuery(additionalFragments: string[] = []) {
  const fragments = getAllQueryFragments()
    .map(({ fragment, dependencies = [] }) => {
      return [fragment, ...dependencies].join("\n");
    })
    .concat(additionalFragments);

  return /* groq */ `
    pageBuilder[]{
      ...,
      _type,
      ${fragments.join(",\n")}
    }
  `;
}

export default blockRegistry;
