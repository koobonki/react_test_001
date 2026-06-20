import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/main/resources/db');

const esc = (value) => String(value ?? '').replace(/'/g, "''");

async function run() {
  const products = await fetch('http://localhost:8081/api/products').then((r) => r.json());
  const rows = [];

  for (const product of products) {
    const models = await fetch(`http://localhost:8081/api/products/${product.id}/models`).then((r) =>
      r.json(),
    );
    rows.push({ product, models });
  }

  fs.writeFileSync(
    path.join(outDir, 'data-snapshot.json'),
    JSON.stringify({ exportedAt: new Date().toISOString(), products: rows }, null, 2),
    'utf8',
  );

  let sql = '-- Current DB snapshot (auto-exported from running H2 DB)\n';
  sql += '-- Restore: H2 Console or run after tables exist\n\n';
  sql += 'DELETE FROM product_models;\n';
  sql += 'DELETE FROM products;\n\n';

  for (const { product } of rows) {
    sql += `INSERT INTO products (id, name, category, price, stock) VALUES (${product.id}, '${esc(product.name)}', '${esc(product.category)}', ${product.price}, ${product.stock});\n`;
  }

  sql += '\n';
  for (const { models } of rows) {
    for (const model of models) {
      sql += `INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (${model.id}, ${model.productId}, '${esc(model.modelName)}', '${esc(model.modelCode)}', ${model.price}, ${model.stock});\n`;
    }
  }

  const maxProductId = Math.max(...products.map((p) => p.id));
  const maxModelId = Math.max(...rows.flatMap((row) => row.models.map((m) => m.id)));
  sql += `\nALTER TABLE products ALTER COLUMN id RESTART WITH ${maxProductId + 1};\n`;
  sql += `ALTER TABLE product_models ALTER COLUMN id RESTART WITH ${maxModelId + 1};\n`;

  fs.writeFileSync(path.join(outDir, 'data-snapshot.sql'), sql, 'utf8');

  const modelCount = rows.reduce((sum, row) => sum + row.models.length, 0);
  console.log(`Exported ${products.length} products, ${modelCount} models`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
