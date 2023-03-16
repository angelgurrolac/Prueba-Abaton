const express = require("express");
const router = express.Router();
const bl = require("../../bl");

router.get("/", async (req, res) => {
    const data = [
        { Date: "22/08/22 13:52", Control: "CHG23028", Result: "Exitoso", Item: ["CI467175"] },
        { Date: "21/08/22 19:41", Control: "CHG23029", Result: "Exitoso", Item: ["CI293090"] },
        { Date: "20/08/22 23:43", Control: "CHG23030", Result: "Exitoso", Item: ["CI790760", "CI254372"] },
        {
            Date: "20/08/22 19:27",
            Control: "[No programado]",
            Result: "n/a",
            Item: "SVRCNTBRDB.Northwind.dbo.SalesByCategory",
            Link: "1"
        },
        {
            Date: "20/08/22 04:19",
            Control: "[No programado]",
            Result: "n/a",
            Item: "SVRCNTBRDB.Northwind.dbo.Customers",
            Link: 2
        },
        { Date: "19/08/22 08:40", Control: "CHG23031", Result: "Exitoso", Item: ["CI191324"] },
        { Date: "18/08/22 13:12", Control: "CHG23031", Result: "Fallido", Item: ["CI191324"] },
        {
            Date: "18/08/22 20:46",
            Control: "[No programado]",
            Result: "n/a",
            Item: "D:\\es\\mb\\modules.d\\system.yml",
            Link: 3
        },
        {
            Date: "18/08/22 18:15",
            Control: "CHG23032",
            Result: "Exitoso",
            Item: ["CI516847", "CI515938", "CI148190", "CI244972"]
        },
        { Date: "18/08/22 14:25", Control: "CHG23033", Result: "Exitoso", Item: ["CI903762"] }
    ];

    res.render("dash/cmdb", { data });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = {
        1: {
            right: `<pre>ALTER PROCEDURE [dbo].[SalesByCategory]
    @CategoryName nvarchar(15), @OrdYear nvarchar(4) = '1998'
AS
IF @OrdYear != '1996' AND @OrdYear != '1997' AND @OrdYear != '1998' 
BEGIN
    SELECT @OrdYear = '1998'
END

SELECT P.ProductName,
    ROUND(SUM(CONVERT(decimal(14, 2), OD.Quantity * (1 - OD.Discount) * OD.UnitPrice)), 0) AS TotalPurchase
<span style="color: green; background-color: lightyellow;">FROM [Order Details] OD, Orders O, Products P, Categories C
WHERE OD.OrderID = O.OrderID
    AND OD.ProductID = P.ProductID
    AND P.CategoryID = C.CategoryID
    AND C.CategoryName = @CategoryName</span>
    AND SUBSTRING(CONVERT(nvarchar(22), O.OrderDate, 111), 1, 4) = @OrdYear
GROUP BY P.ProductName
ORDER BY P.ProductName</pre>`,
            left: `<pre>ALTER PROCEDURE [dbo].[SalesByCategory]
@CategoryName nvarchar(15), @OrdYear nvarchar(4) = '1998'
AS
IF @OrdYear != '1996' AND @OrdYear != '1997' AND @OrdYear != '1998' 
BEGIN
SELECT @OrdYear = '1998'
END

SELECT P.ProductName,
    ROUND(SUM(CONVERT(decimal(14, 2), OD.Quantity * (1 - OD.Discount) * OD.UnitPrice)), 0) AS TotalPurchase
    <span style="color: red; background-color: lightyellow;">FROM [Order Details] AS OD
INNER JOIN Orders AS O ON OD.OrderID = O.OrderID
INNER JOIN Products AS P ON OD.ProductID = P.ProductID
INNER JOIN Categories AS C ON P.CategoryID = C.CategoryID
WHERE C.CategoryName = @CategoryName</span>
AND SUBSTRING(CONVERT(nvarchar(22), O.OrderDate, 111), 1, 4) = @OrdYear
GROUP BY P.ProductName
ORDER BY P.ProductName</pre>`
        },
        2: {
            left: `<table style="font-family: Monospace">
            <tr><th>Column_name</th><th>Type</th><th>Computed</th><th>Length</th><th>Prec</th><th>Scale</th><th>Nullable</th></tr>
            <tr><td>CustomerID</td><td>nchar</td><td>no</td><td>10</td><td></td><td></td><td>no</td></tr>
            <tr><td>CompanyName</td><td>nvarchar</td><td>no</td><td>80</td><td></td><td></td><td>no</td></tr>
            <tr><td>ContactName</td><td>nvarchar</td><td>no</td><td>60</td><td></td><td></td><td>yes</td></tr>
            <tr><td>ContactTitle</td><td>nvarchar</td><td>no</td><td>60</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Address</td><td>nvarchar</td><td>no</td><td>120</td><td></td><td></td><td>yes</td></tr>
            <tr><td>City</td><td>nvarchar</td><td>no</td><td>30</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Region</td><td>nvarchar</td><td>no</td><td>30</td><td></td><td></td><td>yes</td></tr>
            <tr><td>PostalCode</td><td>nvarchar</td><td>no</td><td>20</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Country</td><td>nvarchar</td><td>no</td><td>30</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Phone</td><td>nvarchar</td><td>no</td><td>48</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Fax</td><td>nvarchar</td><td>no</td><td>48</td><td></td><td></td><td>yes</td></tr>
            <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </table>`,
            right: `<table style="font-family: Monospace">
            <tr><th>Column_name</th><th>Type</th><th>Computed</th><th>Length</th><th>Prec</th><th>Scale</th><th>Nullable</th></tr>
            <tr><td>CustomerID</td><td>nchar</td><td>no</td><td>10</td><td></td><td></td><td>no</td></tr>
            <tr><td>CompanyName</td><td>nvarchar</td><td>no</td><td>80</td><td></td><td></td><td>no</td></tr>
            <tr style="background-color: lightyellow"><td>ContactName</td><td>nvarchar</td><td>no</td><td>60</td><td></td><td></td><td style="color: green">no</td></tr>
            <tr><td>ContactTitle</td><td>nvarchar</td><td>no</td><td>60</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Address</td><td>nvarchar</td><td>no</td><td>120</td><td></td><td></td><td>yes</td></tr>
            <tr><td>City</td><td>nvarchar</td><td>no</td><td>30</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Region</td><td>nvarchar</td><td>no</td><td>30</td><td></td><td></td><td>yes</td></tr>
            <tr><td>PostalCode</td><td>nvarchar</td><td>no</td><td>20</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Country</td><td>nvarchar</td><td>no</td><td>30</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Phone</td><td>nvarchar</td><td>no</td><td>48</td><td></td><td></td><td>yes</td></tr>
            <tr><td>Fax</td><td>nvarchar</td><td>no</td><td>48</td><td></td><td></td><td>yes</td></tr>
            <tr style="background-color: lightyellow; color: green"><td>DateAdded</td><td>datetime</td><td>no</td><td>8</td><td></td><td></td><td>yes</td></tr>
            </table>`
        },
        3: {
            left: `<pre>- module: system
  period: 10s
  metricsets:
      - cpu
      <span style="background-color: lightyellow; color: red">#- load</span>
      - memory
      - network
      - process
      - process_summary
      - socket_summary
      <span style="background-color: lightyellow; color: red">#- entropy
      #- core
      #- diskio
      #- socket
      #- service
      #- users</span>

- module: system
  period: 1m
  metricsets:
      - filesystem
      - fsstat
  processors:
      - drop_event.when.regexp:
            system.filesystem.mount_point: "^/(sys|cgroup|proc|dev|etc|host|lib|snap)($|/)"</pre>`,
  right: `<pre>- module: system
  period: 10s
  metricsets:
      - cpu
      <span style="background-color: lightyellow; color: green">- load</span>
      - memory
      - network
      - process
      - process_summary
      - socket_summary
      <span style="background-color: lightyellow; color: green">- entropy
      - core
      - diskio
      - socket
      - service
      - users</span>

- module: system
  period: 1m
  metricsets:
      - filesystem
      - fsstat
  processors:
      - drop_event.when.regexp:
            system.filesystem.mount_point: "^/(sys|cgroup|proc|dev|etc|host|lib|snap)($|/)"</pre>`
        }
    }[id];
    res.render("dash/cmdb_ci", { data });
});

module.exports = router;
