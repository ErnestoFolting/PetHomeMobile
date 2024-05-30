use testdb;
go
CREATE FUNCTION DistanceBetweenPlaces (
    @lon1 float,
    @lat1 float,
    @lon2 float,
    @lat2 float
)
RETURNS float
AS
BEGIN
    DECLARE @dlon float = RADIANS(@lon2 - @lon1);
    DECLARE @dlat float = RADIANS(@lat2 - @lat1);

    DECLARE @a float = SIN(@dlat / 2) * SIN(@dlat / 2) + COS(RADIANS(@lat1)) * COS(RADIANS(@lat2)) * (SIN(@dlon / 2) * SIN(@dlon / 2));
    DECLARE @angle float = 2 * ATN2(SQRT(@a), SQRT(1 - @a));
    RETURN @angle * 6378.16;
END;