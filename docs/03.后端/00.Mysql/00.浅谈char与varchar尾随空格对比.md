---
title: 浅谈char与varchar尾随空格对比
date: 2023-12-06 11:15:46
permalink: /pages/4560c6/
categories:
  - 后端
  - Mysql
tags:
  - 
author: 
  name: lycpan233
  link: https://github.com/lycpan233
---

## 背景
在日常业务中，偶然发现前端传入的串是有尾随空格的，但是实际使用中并未出问题。
例如执行查询：

```sql
SELECT * FROM a WHERE str = "你好";
```

但是可以匹配到：

```sql
str = `你好 `; 
str = `你好`; 
```



 

## 实验

### 环境

Mysql  5.7.27

未调整空格处理模式 ([MySQL :: MySQL 8.0 Reference Manual :: 10.8.5 The binary Collation Compared to _bin Collations](https://dev.mysql.com/doc/refman/8.0/en/charset-binary-collations.html#charset-binary-collations-trailing-space-comparisons))



```sql
CREATE TABLE vc (v VARCHAR(4), c CHAR(4));

INSERT INTO vc VALUES ('ab  ', 'ab  ');

SELECT CONCAT('(', v, ')'), CONCAT('(', c, ')') FROM vc;
-- CONCAT('(', v, ')') | CONCAT('(', c, ')')
-- (ab  )  						 |	(ab)

SELECT * FROM vc WHERE v = 'ab';
-- v   | c
-- ab  | ab

SELECT * FROM vc WHERE c = 'ab';
-- v   | c
-- ab  | ab


SELECT * FROM vc WHERE v LIKE 'ab';
-- v   | c
--     |

SELECT * FROM c WHERE v LIKE 'ab';
-- v   | c
-- ab  | ab
```



## 结论

- 插入带尾部空格的字符串
  - char，截取尾随空格
  - varchar，不做处理
- 查询对比时
  - 等号，过滤等号右侧的尾随空格
  - LIKE，不做处理



## 相关文档

[MySQL :: MySQL 8.0 Reference Manual :: 11.3.2 The CHAR and VARCHAR Types](https://dev.mysql.com/doc/refman/8.0/en/char.html)

