#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";

const BLOCKS_DIR = path.join(process.cwd(), "src/components/blocks");

function generateBlockFiles(blockName: string) {
  const blockDir = path.join(BLOCKS_DIR, blockName);
  const camelCaseName = blockName.charAt(0).toLowerCase() + blockName.slice(1);

  // Create block directory
  fs.mkdirSync(blockDir, { recursive: true });

  // Generate component file with inline types
  const componentContent = `type ${blockName}Props = {
  _type: "${camelCaseName}";
  title?: string;
  // Add more props as needed
};

export function ${blockName}({ title }: ${blockName}Props) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
    </section>
  );
}`;

  // Generate schema file
  const schemaContent = `import { defineField, defineType } from "sanity";
import { Paperclip } from "lucide-react";

export const ${camelCaseName} = defineType({
  name: "${camelCaseName}",
  title: "${blockName.replace(/([A-Z])/g, " $1").trim()}",
  icon: Paperclip,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    // Add more fields as needed
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "${blockName} Block",
    }),
  },
});`;

  // Write files
  fs.writeFileSync(path.join(blockDir, "index.tsx"), componentContent);
  fs.writeFileSync(path.join(blockDir, "schema.ts"), schemaContent);

  // Update main index.ts
  updateMainIndex(blockName, camelCaseName);

  console.log(`✅ Generated ${blockName} block successfully!`);
}

function updateMainIndex(blockName: string, camelCaseName: string) {
  const indexPath = path.join(BLOCKS_DIR, "index.ts");
  let indexContent = fs.readFileSync(indexPath, "utf8");
  const lines = indexContent.split("\n");

  // Add schema import at the top with other schema imports
  const schemaImportLine = `import { ${camelCaseName} } from "./${blockName}/schema";`;
  const firstComponentImport = lines.findIndex((line) =>
    line.includes("// Component imports"),
  );
  if (firstComponentImport !== -1) {
    lines.splice(firstComponentImport - 1, 0, schemaImportLine);
  } else {
    lines.unshift(schemaImportLine);
  }

  // Add component import in the component section
  const componentImportLine = `import { ${blockName} } from "./${blockName}";`;
  const afterComponentsComment = lines.findIndex((line) =>
    line.includes("// Component imports"),
  );
  if (afterComponentsComment !== -1) {
    lines.splice(afterComponentsComment + 1, 0, componentImportLine);
  }

  // Add to BLOCK_COMPONENTS
  const blockComponentsStart = lines.findIndex((line) =>
    line.includes("export const BLOCK_COMPONENTS = {"),
  );
  if (blockComponentsStart !== -1) {
    const blockComponentsEnd = lines.findIndex(
      (line, i) => i > blockComponentsStart && line.includes("} as const;"),
    );
    if (blockComponentsEnd !== -1) {
      const indent = "  ";
      lines.splice(
        blockComponentsEnd,
        0,
        `${indent}${camelCaseName}: ${blockName},`,
      );
    }
  }

  // Add to pageBuilderBlocks
  const pageBuilderStart = lines.findIndex((line) =>
    line.includes("export const pageBuilderBlocks = ["),
  );
  if (pageBuilderStart !== -1) {
    const pageBuilderEnd = lines.findIndex(
      (line, i) => i > pageBuilderStart && line.includes("];"),
    );
    if (pageBuilderEnd !== -1) {
      const indent = "  ";
      lines.splice(pageBuilderEnd, 0, `${indent}${camelCaseName},`);
    }
  }

  // Write back to file
  fs.writeFileSync(indexPath, lines.join("\n"));
}

// Get block name from command line argument
const blockName = process.argv[2];
if (!blockName) {
  console.error("Please provide a block name!");
  process.exit(1);
}

generateBlockFiles(blockName);
