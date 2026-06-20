-- 품목(product_models) 초기 시드 — 상품 5종 × 품목 5개 = 25건
-- product_id는 products.name으로 서브쿼리 조회
-- AG Grid 시작 화면에 표시되는 데이터

-- 노트북
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'MacBook Pro 14', 'NB-001', 2390000, 8 FROM products p WHERE p.name = '노트북'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'MacBook Pro 14');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Galaxy Book4 Pro', 'NB-002', 1890000, 12 FROM products p WHERE p.name = '노트북'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Galaxy Book4 Pro');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'LG gram 16', 'NB-003', 1650000, 10 FROM products p WHERE p.name = '노트북'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'LG gram 16');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Dell XPS 15', 'NB-004', 2100000, 6 FROM products p WHERE p.name = '노트북'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Dell XPS 15');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'ASUS ZenBook 14', 'NB-005', 1290000, 15 FROM products p WHERE p.name = '노트북'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'ASUS ZenBook 14');

-- 무선 마우스
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'MX Master 3S', 'MS-001', 129000, 25 FROM products p WHERE p.name = '무선 마우스'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'MX Master 3S');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'G304 Lightspeed', 'MS-002', 59000, 40 FROM products p WHERE p.name = '무선 마우스'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'G304 Lightspeed');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Signature M650', 'MS-003', 49000, 30 FROM products p WHERE p.name = '무선 마우스'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Signature M650');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Arc Mouse', 'MS-004', 89000, 18 FROM products p WHERE p.name = '무선 마우스'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Arc Mouse');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Pebble M350', 'MS-005', 29000, 50 FROM products p WHERE p.name = '무선 마우스'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Pebble M350');

-- 기계식 키보드
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Keychron K2', 'KB-001', 99000, 20 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Keychron K2');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'HHKB Professional', 'KB-002', 320000, 5 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'HHKB Professional');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Logitech G Pro', 'KB-003', 159000, 15 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Logitech G Pro');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Corsair K70', 'KB-004', 189000, 12 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Corsair K70');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Razer BlackWidow', 'KB-005', 139000, 18 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Razer BlackWidow');

-- 책상
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Standing Desk Pro', 'DK-001', 450000, 8 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Standing Desk Pro');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Compact Desk', 'DK-002', 120000, 15 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Compact Desk');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'L-Shape Desk', 'DK-003', 280000, 6 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'L-Shape Desk');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Gaming Desk', 'DK-004', 199000, 10 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Gaming Desk');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Office Desk Basic', 'DK-005', 89000, 20 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Office Desk Basic');

-- 의자
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Ergo Chair Plus', 'CH-001', 350000, 10 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Ergo Chair Plus');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Mesh Office Chair', 'CH-002', 89000, 25 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Mesh Office Chair');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Gaming Chair X', 'CH-003', 220000, 8 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Gaming Chair X');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Executive Leather', 'CH-004', 450000, 5 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Executive Leather');
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Student Chair', 'CH-005', 45000, 30 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Student Chair');
