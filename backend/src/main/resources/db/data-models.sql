-- 상품별 모델 데이터 (상품 5종 × 모델 5개)

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
SELECT p.id, 'Keychron K2 Pro', 'KB-001', 139000, 20 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Keychron K2 Pro');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'HHKB Professional', 'KB-002', 320000, 8 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'HHKB Professional');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Razer BlackWidow V4', 'KB-003', 189000, 14 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Razer BlackWidow V4');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Logitech G Pro X', 'KB-004', 159000, 16 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Logitech G Pro X');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Corsair K70 RGB', 'KB-005', 175000, 12 FROM products p WHERE p.name = '기계식 키보드'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Corsair K70 RGB');

-- 책상
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'IKEA BEKANT 160', 'DK-001', 249000, 7 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'IKEA BEKANT 160');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, '듀오데일 L형 1200', 'DK-002', 189000, 9 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = '듀오데일 L형 1200');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, '모션데스크 전동 1400', 'DK-003', 459000, 5 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = '모션데스크 전동 1400');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, '소형 책상 800', 'DK-004', 89000, 14 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = '소형 책상 800');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, '사무용 책상 1200', 'DK-005', 129000, 11 FROM products p WHERE p.name = '책상'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = '사무용 책상 1200');

-- 의자
INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Herman Miller Aeron', 'CH-001', 1890000, 4 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Herman Miller Aeron');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Steelcase Leap V2', 'CH-002', 1450000, 6 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Steelcase Leap V2');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'DXRacer Formula', 'CH-003', 389000, 10 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'DXRacer Formula');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'IKEA MARKUS', 'CH-004', 229000, 15 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'IKEA MARKUS');

INSERT INTO product_models (product_id, model_name, model_code, price, stock)
SELECT p.id, 'Secretlab TITAN Evo', 'CH-005', 649000, 8 FROM products p WHERE p.name = '의자'
AND NOT EXISTS (SELECT 1 FROM product_models pm WHERE pm.product_id = p.id AND pm.model_name = 'Secretlab TITAN Evo');
