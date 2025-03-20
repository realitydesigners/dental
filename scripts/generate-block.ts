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
  subtitle?: string;
  description?: string;
  // Add more props as needed
};

export function ${blockName}({ title, subtitle, description }: ${blockName}Props) {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <h3 className="text-xl text-blue-400 mb-6">
            {subtitle}
          </h3>
        )}
        {description && (
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}`;

  // Generate schema file
  const schemaContent = `import { defineField, defineType } from "sanity";
import { Stethoscope } from "lucide-react";

export const ${camelCaseName} = defineType({
  name: "${camelCaseName}",
  title: "${blockName.replace(/([A-Z])/g, " $1").trim()}",
  icon: Stethoscope,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Main heading for this section",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "A supporting headline",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Detailed content for this section",
      rows: 3,
    }),
    // Add more fields as needed
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Untitled",
      subtitle: subtitle || "${blockName} Block",
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
    line.includes("// Component imports")
  );
  if (firstComponentImport !== -1) {
    lines.splice(firstComponentImport - 1, 0, schemaImportLine);
  } else {
    lines.unshift(schemaImportLine);
  }

  // Add component import in the component section
  const componentImportLine = `import { ${blockName} } from "./${blockName}";`;
  const afterComponentsComment = lines.findIndex((line) =>
    line.includes("// Component imports")
  );
  if (afterComponentsComment !== -1) {
    lines.splice(afterComponentsComment + 1, 0, componentImportLine);
  }

  // Add to BLOCK_COMPONENTS
  const blockComponentsStart = lines.findIndex((line) =>
    line.includes("export const BLOCK_COMPONENTS = {")
  );
  if (blockComponentsStart !== -1) {
    const blockComponentsEnd = lines.findIndex(
      (line, i) => i > blockComponentsStart && line.includes("} as const;")
    );
    if (blockComponentsEnd !== -1) {
      const indent = "  ";
      lines.splice(
        blockComponentsEnd,
        0,
        `${indent}${camelCaseName}: ${blockName},`
      );
    }
  }

  // Add to pageBuilderBlocks
  const pageBuilderStart = lines.findIndex((line) =>
    line.includes("export const pageBuilderBlocks = [")
  );
  if (pageBuilderStart !== -1) {
    // Find the actual end of the array, accounting for multiline format
    let pageBuilderEnd = -1;
    for (let i = pageBuilderStart; i < lines.length; i++) {
      if (lines[i].includes("];")) {
        pageBuilderEnd = i;
        break;
      }
    }

    if (pageBuilderEnd !== -1) {
      // Check if array is multiline or single line
      const isMultiline = pageBuilderEnd - pageBuilderStart > 1;
      const indent = "  ";

      if (isMultiline) {
        // Insert before the closing bracket
        lines.splice(pageBuilderEnd, 0, `${indent}${camelCaseName},`);
      } else {
        // Convert to multiline format
        const arrayContent = lines[pageBuilderStart];
        const openBracketIndex = arrayContent.indexOf("[");
        const closeBracketIndex = arrayContent.indexOf("]");
        const existingItems = arrayContent
          .slice(openBracketIndex + 1, closeBracketIndex)
          .trim();

        // Replace single line with multiline format
        lines[pageBuilderStart] = `export const pageBuilderBlocks = [`;
        lines.splice(
          pageBuilderStart + 1,
          0,
          ...existingItems
            .split(",")
            .filter((item) => item.trim())
            .map((item) => `${indent}${item.trim()},`),
          `${indent}${camelCaseName},`
        );
        lines.splice(
          pageBuilderStart +
            2 +
            existingItems.split(",").filter((item) => item.trim()).length,
          0,
          "];"
        );

        // Remove original closing part
        if (lines[pageBuilderStart + 1] === "];") {
          lines.splice(pageBuilderStart + 1, 1);
        }
      }
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
