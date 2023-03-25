CREATE PROCEDURE spGetReceiptByReceiptId @RID VARCHAR(MAX)
AS

SELECT c.FirstName, c.LastName, i.InvenName, i.SalePrice, r.ReceiptId FROM Inventory i
	INNER JOIN ReceiptDetail rd ON i.InventoryId = rd.InventoryId
	INNER JOIN Receipt r ON rd.ReceiptId = r.ReceiptId
	INNER JOIN Customer c ON r.CustId = r.CustId 
		WHERE r.ReceiptId = @RID;

GO