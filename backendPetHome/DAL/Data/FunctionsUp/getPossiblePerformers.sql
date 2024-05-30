use testdb;

go
CREATE FUNCTION selectPossiblePerformers (
    @advertStartTime dateTime,
    @advertEndTime dateTime,
	@advertLocationLng float,
	@advertLocationLat float,
	@ownerId nvarchar(450)
)
RETURNS @UserIds table(id nvarchar (450))
AS
BEGIN
INSERT INTO @UserIds
SELECT Id
FROM AspNetUsers
WHERE NOT EXISTS (
    SELECT *
    FROM timeExceptions
    WHERE userId = AspNetUsers.Id
    AND date >= @advertStartTime
    AND date <= @advertEndTime
)
AND Id <> @ownerId
AND [dbo].DistanceBetweenPlaces(AspNetUsers.locationLng, AspNetUsers.locationLat, @advertLocationLng, @advertLocationLat) < 30
RETURN ;
END
go