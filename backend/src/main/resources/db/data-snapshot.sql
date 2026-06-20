-- Current DB snapshot (auto-exported from running H2 DB)
-- Restore: H2 Console or run after tables exist

DELETE FROM product_models;
DELETE FROM products;

INSERT INTO products (id, name, category, price, stock) VALUES (1, '노트북', '전자기기', 1200000, 15);
INSERT INTO products (id, name, category, price, stock) VALUES (2, '무선 마우스', '전자기기', 35000, 80);
INSERT INTO products (id, name, category, price, stock) VALUES (3, '기계식 키보드', '전자기기', 89000, 42);
INSERT INTO products (id, name, category, price, stock) VALUES (4, '책상', '가구', 150000, 10);
INSERT INTO products (id, name, category, price, stock) VALUES (5, '의자', '가구', 95000, 25);
INSERT INTO products (id, name, category, price, stock) VALUES (6, '노트북', '', 0, 0);
INSERT INTO products (id, name, category, price, stock) VALUES (33, '', '', 0, 0);

INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (1, 1, 'MacBook Pro 14', 'NB-001', 2390000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (3, 1, 'Galaxy Book4 Pro', 'NB-002', 1890000, 12);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (5, 1, 'LG gram 16', 'NB-003', 1650000, 10);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (7, 1, 'Dell XPS 15', 'NB-004', 2100000, 6);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (9, 1, 'ASUS ZenBook 14', 'NB-005', 1290000, 15);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (11, 2, 'MX Master 3S', 'MS-001', 129000, 25);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (12, 2, 'G304 Lightspeed', 'MS-002', 59000, 40);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (13, 2, 'Signature M650', 'MS-003', 49000, 30);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (14, 2, 'Arc Mouse', 'MS-004', 89000, 18);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (15, 2, 'Pebble M350', 'MS-005', 29000, 50);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (16, 3, 'Keychron K2 Pro', 'KB-001', 139000, 20);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (17, 3, 'HHKB Professional', 'KB-002', 320000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (18, 3, 'Razer BlackWidow V4', 'KB-003', 189000, 14);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (19, 3, 'Logitech G Pro X', 'KB-004', 159000, 16);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (20, 3, 'Corsair K70 RGB', 'KB-005', 175000, 12);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (33, 3, 'Keychron K2', 'KB-001', 99000, 20);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (34, 3, 'Logitech G Pro', 'KB-003', 159000, 15);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (35, 3, 'Corsair K70', 'KB-004', 189000, 12);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (36, 3, 'Razer BlackWidow', 'KB-005', 139000, 18);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (21, 4, 'IKEA BEKANT 160', 'DK-001', 249000, 7);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (22, 4, '듀오데일 L형 1200', 'DK-002', 189000, 9);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (23, 4, '모션데스크 전동 1400', 'DK-003', 459000, 5);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (24, 4, '소형 책상 800', 'DK-004', 89000, 14);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (25, 4, '사무용 책상 1200', 'DK-005', 129000, 11);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (37, 4, 'Standing Desk Pro', 'DK-001', 450000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (38, 4, 'Compact Desk', 'DK-002', 120000, 15);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (39, 4, 'L-Shape Desk', 'DK-003', 280000, 6);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (40, 4, 'Gaming Desk', 'DK-004', 199000, 10);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (41, 4, 'Office Desk Basic', 'DK-005', 89000, 20);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (26, 5, 'Herman Miller Aeron', 'CH-001', 1890000, 4);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (27, 5, 'Steelcase Leap V2', 'CH-002', 1450000, 6);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (28, 5, 'DXRacer Formula', 'CH-003', 389000, 10);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (29, 5, 'IKEA MARKUS', 'CH-004', 229000, 15);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (30, 5, 'Secretlab TITAN Evo', 'CH-005', 649000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (42, 5, 'Ergo Chair Plus', 'CH-001', 350000, 10);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (43, 5, 'Mesh Office Chair', 'CH-002', 89000, 25);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (44, 5, 'Gaming Chair X', 'CH-003', 220000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (45, 5, 'Executive Leather', 'CH-004', 450000, 5);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (46, 5, 'Student Chair', 'CH-005', 45000, 30);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (2, 6, 'MacBook Pro 14', 'NB-001', 2390000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (4, 6, 'Galaxy Book4 Pro', 'NB-002', 1890000, 12);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (6, 6, 'LG gram 16', 'NB-003', 1650000, 10);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (8, 6, 'Dell XPS 15', 'NB-004', 2100000, 6);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (10, 6, 'ASUS ZenBook 14', 'NB-005', 1290000, 15);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (47, 33, ' 품목 1', 'P33-01', 1000, 6);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (48, 33, ' 품목 2', 'P33-02', 2000, 7);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (49, 33, ' 품목 3', 'P33-03', 3000, 8);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (50, 33, ' 품목 4', 'P33-04', 4000, 9);
INSERT INTO product_models (id, product_id, model_name, model_code, price, stock) VALUES (51, 33, ' 품목 5', 'P33-05', 5000, 10);

ALTER TABLE products ALTER COLUMN id RESTART WITH 34;
ALTER TABLE product_models ALTER COLUMN id RESTART WITH 52;
