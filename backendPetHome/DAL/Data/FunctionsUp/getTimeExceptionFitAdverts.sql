use testdb;


go
CREATE FUNCTION dbo.getTimeExceptionFitAdverts (
    @userId NVARCHAR(100)
)
RETURNS TABLE
AS
RETURN (
    SELECT *
    FROM adverts a
    WHERE NOT EXISTS (
        SELECT 1
        FROM timeExceptions te
        WHERE te.userId = @userId
        AND CAST(te.date AS DATE) >= CAST(a.startTime AS DATE)
        AND CAST(te.date AS DATE) <= CAST(a.endTime AS DATE)
    )
);
go
