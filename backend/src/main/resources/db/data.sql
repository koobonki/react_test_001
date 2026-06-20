-- 초기 샘플 데이터 (테이블이 비어 있을 때만 삽입)
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
