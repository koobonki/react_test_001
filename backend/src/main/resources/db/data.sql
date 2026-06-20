-- 상품(products) 초기 시드 데이터 — 5건
-- WHERE NOT EXISTS: 이미 DB에 데이터가 있으면 중복 삽입하지 않음
-- Frontend Tab: 전자기기 3건, 가구 2건

INSERT INTO products (name, category, price, stock)
SELECT '노트북', '전자기기', 1200000, 15
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, category, price, stock)
SELECT '무선 마우스', '전자기기', 35000, 80
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = '무선 마우스');

INSERT INTO products (name, category, price, stock)
SELECT '기계식 키보드', '전자기기', 89000, 42
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = '기계식 키보드');

INSERT INTO products (name, category, price, stock)
SELECT '책상', '가구', 150000, 10
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = '책상');

INSERT INTO products (name, category, price, stock)
SELECT '의자', '가구', 95000, 25
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = '의자');
