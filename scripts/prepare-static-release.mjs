import { createHash, randomUUID } from "node:crypto";
import {
  access,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "client");
const required = [
  "index.html",
  "index.rsc",
  "404.html",
  "projects/commerceflow/index.html",
  "projects/ticket/index.html",
  "projects/devflow/index.html",
  "projects/commerceflow.rsc",
  "projects/ticket.rsc",
  "projects/devflow.rsc",
];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

await access(output);
await Promise.all(required.map((relative) => access(path.join(output, relative))));

const source = path.join(output, "index.rsc");
const alias = path.join(output, ".rsc");
const sourceBytes = await readFile(source);
const temporary = path.join(output, `.rsc.tmp-${process.pid}-${randomUUID()}`);

try {
  await writeFile(temporary, sourceBytes, { flag: "wx" });
  await rename(temporary, alias);
} finally {
  await rm(temporary, { force: true });
}

const aliasBytes = await readFile(alias);
const sourceHash = sha256(sourceBytes);
const aliasHash = sha256(aliasBytes);
if (
  sourceBytes.length !== aliasBytes.length ||
  !sourceBytes.equals(aliasBytes) ||
  sourceHash !== aliasHash
) {
  throw new Error("Root RSC alias verification failed");
}

console.log(
  JSON.stringify(
    {
      output: path.relative(root, output).replaceAll(path.sep, "/"),
      source: "index.rsc",
      alias: ".rsc",
      bytes: sourceBytes.length,
      sha256: sourceHash,
      byteIdentical: true,
    },
    null,
    2,
  ),
);
